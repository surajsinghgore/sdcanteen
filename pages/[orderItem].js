import { useRouter } from "next/router"
export default function OrderItem() {
const router=useRouter();
const query=router.query.orderItem
  return (
    <div>{query}</div>
  )
}
