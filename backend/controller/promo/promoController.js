const Promo = require("../../model/promocode/promoModel");

const createPromoCode = async (req, res, next) => {
  try {
    const promodata = await Promo.create(req.body);
    if (!promodata) {
      throw new Error("Unable to create Promo Code");
    } else {
      res.status(200).json({
        status: true,
        message: "Promo Code created Successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getPromoCode = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const promodata = await Promo.findOne({
      promoCode: req.params.id,
    });
    if (!promodata) {
      throw new Error("No promo code found");
    } else {
      res.status(200).json({
        status: true,
        data: promodata,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPromoCode,
  getPromoCode,
};
