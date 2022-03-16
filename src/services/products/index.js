import { Router } from "express";
import { Review, Product } from "../../db/models/index.js";
import { Op } from "sequelize";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await Product.findAll({
      include: User,
      where: {
        [Op.or]: [
          {
            name: {
              [Op.in]: req.query.name.split(","),
            },
          },
          req.query.category && {
            category: {
              [Op.iLike]: `%${req.query.category}%`,
            },
          },
          req.query.description && {
            description: {
              [Op.iLike]: `%${req.query.description}%`,
            },
          },
          req.query.image && {
            image: {
              [Op.iLike]: `%${req.query.image}%`,
            },
          },
          req.query.price && {
            price: {
              [Op.iLike]: `%${req.query.price}%`,
            },
          },
        ],
      },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(result[1][0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Product.destroy({ where: { id: req.params.id } });
    res.send({ rows });
  } catch (error) {
    console.log(error);
  }
});

export default router;