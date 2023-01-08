import DbConnection from "./Middleware/DbConnection";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import ItemRatings from "./Schema/ItemRating";

export default async function UpdateRating(req, res) {
  if (req.method == "PUT") {
    try {
      DbConnection();
      let res1 = await VerifyClientUser(req, res);
      if (res1 == undefined) {
        return res
          .status(401)
          .json({ message: "Please login with Client credentails" });
      }
      let id = res1.id;
      if (!id) {
        res
          .status(401)
          .json({ message: "please Provide Id To Find Record Of User" });
      }
      let userName = req.body.userName;
      let productId = req.body.productId;
      let userMessage = req.body.userMessage;
      let serviceRate = req.body.serviceRate;
      let priceRate = req.body.priceRate;
      let qualityRate = req.body.qualityRate;
      let overallRate = req.body.overallRate;

      if (userName == "") {
        return res.status(400).json({ message: "Please Provide User Name" });
      }
      if (productId == "") {
        return res.status(498).json({ message: "Please Provide Product Id " });
      }
      if (userMessage == "") {
        return res
          .status(400)
          .json({ message: "Please Fill User Message field" });
      }
      if (serviceRate == "") {
        return res
          .status(400)
          .json({ message: "Please give service rate field" });
      }
      if (priceRate == "") {
        return res
          .status(400)
          .json({ message: "Please give price rate field" });
      }
      if (overallRate == "") {
        return res
          .status(400)
          .json({ message: "Please give overall rate field" });
      }
      if (qualityRate == "") {
        return res
          .status(400)
          .json({ message: "Please give quality rate field" });
      }

      let dates = new Date();
      let Dates =
        dates.getDate() +
        "-" +
        (dates.getMonth() + 1) +
        "-" +
        dates.getFullYear();
      let LocalString = dates.toLocaleString();
      let hours = dates.getHours();
      let OrderTimes;
      let m = parseInt(dates.getMinutes());
      if (m <= 9) {
        m = "0" + m;
      }
      if (hours >= 12) {
        OrderTimes = dates.getHours() + "-" + m + " PM";
      } else {
        OrderTimes = dates.getHours() + "-" + m + " AM";
      }
      let Times = OrderTimes;
      let CDate = parseInt(dates.getDate());
      let CMonth = parseInt(dates.getMonth() + 1);
      let CYear = parseInt(dates.getFullYear());
      let CHours = parseInt(dates.getHours());
      let CMins = parseInt(m);

      await ItemRatings.updateMany(
        { ProductId: productId, "ItemsReviwers.userId": id },
        {
          $set: {
            "ItemsReviwers.$.OverAllRate": overallRate,
            "ItemsReviwers.$.Message": userMessage,
            "ItemsReviwers.$.QualityRate": qualityRate,
            "ItemsReviwers.$.ServiceRate": serviceRate,
            "ItemsReviwers.$.PriceRate": priceRate,
            "ItemsReviwers.$.Date": Dates,
            "ItemsReviwers.$.Time": Times,
            "ItemsReviwers.$.CDate": CDate,
            "ItemsReviwers.$.CMonth": CMonth,
            "ItemsReviwers.$.CYear": CYear,
            "ItemsReviwers.$.CHours": CHours,
            "ItemsReviwers.$.CMins": CMins,
            "ItemsReviwers.$.LocalString": LocalString,
          },
        }
      );

      let findProduct = await ItemRatings.find({ ProductId: productId });
      let ZeroPointFive = 0;
      let OnePointFive = 0;
      let TwoPointFive = 0;
      let ThreePointFive = 0;
      let FourPointFive = 0;
      let One = 0;
      let two = 0;
      let three = 0;
      let four = 0;
      let five = 0;

      findProduct[0].ItemsReviwers.map((item) => {
        if (item.QualityRate == "0.5") {
          ZeroPointFive++;
        }
        if (item.QualityRate == "1") {
          One++;
        }
        if (item.QualityRate == "1.5") {
          OnePointFive++;
        }
        if (item.QualityRate == "2") {
          two++;
        }
        if (item.QualityRate == "2.5") {
          TwoPointFive++;
        }
        if (item.QualityRate == "3") {
          three++;
        }
        if (item.QualityRate == "3.5") {
          ThreePointFive++;
        }
        if (item.QualityRate == "4") {
          four++;
        }
        if (item.QualityRate == "4.5") {
          FourPointFive++;
        }
        if (item.QualityRate == "5") {
          five++;
        }
      });

      if (qualityRate == "0.5") {
        ZeroPointFive++;
      }
      if (qualityRate == "1") {
        One++;
      }
      if (qualityRate == "1.5") {
        OnePointFive++;
      }
      if (qualityRate == "2") {
        two++;
      }
      if (qualityRate == "2.5") {
        TwoPointFive++;
      }
      if (qualityRate == "3") {
        three++;
      }
      if (qualityRate == "3.5") {
        ThreePointFive++;
      }
      if (qualityRate == "4") {
        four++;
      }
      if (qualityRate == "4.5") {
        FourPointFive++;
      }
      if (qualityRate == "5") {
        five++;
      }
      let NumberOfReviews = Number(findProduct[0].NumberOfReviews);
      NumberOfReviews = NumberOfReviews + 1;
      // Overall Product Rate Manage
      let OverAllProuctRate =
        (5 * five +
          4.5 * FourPointFive +
          4 * four +
          3.5 * ThreePointFive +
          3 * three +
          2.5 * TwoPointFive +
          2 * two +
          1.5 * OnePointFive +
          1 * One +
          0.5 * ZeroPointFive) /
        NumberOfReviews;

      await ItemRatings.findByIdAndUpdate(
        { _id: findProduct[0]._id },
        {
          Rating: OverAllProuctRate,
        }
      );

      return res
        .status(201)
        .json({ message: "successfully updated", status: "201" });
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
