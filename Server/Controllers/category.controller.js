const Category = require("../Models/category.model");
const calculateDiscount = require("../Services/calculateDiscount");

const categoryController = {
  getAll: async (req, res) => {
    const { date } = req.query; //Tarix verilibsə
    try {
      let categories = await Category.find({});
      if (date) {
        //Date-ə görə endirimlərin hesablanması
        //Bütün category-lərə baxılır
        const updatedCategories = categories.map((category) => {
          //Hər bir category-nin item-larına baxılır
          const updatedMenuItems = category.menuItems.map((menuItem) => {
            // Qiymət dəyişir
            menuItem.priceSell = calculateDiscount(menuItem, date);
            return menuItem;
          });
          //Yenilənmiş hall qaytarılır
          return {
            ...category.toObject(),
            menuItems: updatedMenuItems,
          };
        });
        res.status(200).json({
          data: {
            name: "Main Menu",
            categories: updatedCategories, // Bütün menu (Date nəzərə alınaraq) category-ləri ilə birlikdə qaytarılır
          },
          message: "Success",
        });
      } else {
        res.status(200).json({
          data: {
            name: "Main Menu",
            categories: categories, // Bütün menu category-ləri ilə birlikdə qaytarılır
          },
          message: "Success",
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params; // Axtardığımız məhsulun(Menuİtem) İD-i
      const { date } = req.query; //Tarix verilibsə
      // İd-ə uyğun məhsulu tapmaq üçün bizə bütün category-lər lazımdır
      const categories = await Category.find({});

      let foundMenuItem = null;
      let foundCategory = null;
      for (const category of categories) {
        // MenuItem'ı tapmaq üçün categories array-ı içində gəzək
        foundMenuItem = category.menuItems.find((item) => item.id == id); //hər bir category içində axtarış edirik
        if (foundMenuItem) {
          foundCategory = category;
          break; // Tapdığımızda isə dövrü sonlandırırıq
        }
      }

      if (foundMenuItem && foundCategory) {
        if (date) {
          foundMenuItem.priceSell = calculateDiscount(foundMenuItem, date);
          res.status(200).json({
            category: foundCategory._id, // Məhsulun yerləşdiyi category-nin İD-i
            menuItem: {
              ...foundMenuItem,
              priceSell: foundMenuItem.priceSell,
            }, // Axtardığımız Məhsul
          });
        } else {
          res.status(200).json({
            category: foundCategory._id, // Məhsulun yerləşdiyi category-nin İD-i
            menuItem: foundMenuItem, // Axtardığımız Məhsul
          });
        }
      } else {
        res.status(404).json({ message: "MenuItem not found in any category" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
  post: async (req, res) => {
    try {
      let newData = new Category(req.body); // Body-dən payload götürülür
      await newData.save(); // Data Base-ə Göndərilir
      res.status(201).json({
        message: "Success",
        data: newData, // Yeni data qaytarılır
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Bad Request", error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      let data = await Category.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Bad Request", error: error.message });
    }
  },
};

module.exports = categoryController;
