import DbConnection from "./Middleware/DbConnection";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";

export default async function VerifyAdminLogin(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      await VerifyAdmin(req, res);

    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
