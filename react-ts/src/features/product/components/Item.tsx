import { Link } from "react-router-dom"

type Props = {
  item:any
}

const ProductItem = ({item}: Props) => {
  return (
    <Link to={`${item?.id}`} className="group block">
        <div className="relative h-[350px] sm:h-[450px]">
            <img
            src="https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
            />

            <img
            src="https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
            />
        </div>

        <div className="mt-3">
            <h3
            className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4"
            >
            {item?.name}
            </h3>

            <p className="mt-1.5 max-w-[40ch] text-xs text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quibusdam
            ab maiores placeat odio id?
            </p>
        </div>
    </Link>
  )
}

export default ProductItem