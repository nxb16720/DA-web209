import Cart from "../models/cart";
//
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    if (cart.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(cart);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng thì cập nhật số lượng
    let existingProduct = await Cart.findOne({ productId });
    if (existingProduct) {
      existingProduct.quantity += parseInt(quantity, 10); // Sử dụng parseInt để đảm bảo quantity là số nguyên
      await existingProduct.save(); // Lưu lại dữ liệu của sản phẩm đã tồn tại trong giỏ hàng
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      existingProduct = new Cart({
        productId,
        quantity: parseInt(quantity, 10),
      }); // Sử dụng new để tạo mới Cart object
      await existingProduct.save(); // Lưu sản phẩm mới vào giỏ hàng
    }

    return res.status(200).json({
      message: "Đã thêm sản phẩm vào giỏ hàng",
      data: existingProduct, // Trả về thông tin sản phẩm vừa thêm vào giỏ hàng (hoặc đã cập nhật số lượng)
    });
  } catch (error) {
    return res.status(500).json({
      // Sử dụng mã lỗi 500 cho lỗi server
      message: "Đã có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng",
      error: error.message,
    });
  }
};
export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ _id: req.params.id });
    return res.json({
      message: "Xóa gio hang thành công",
      cart,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
