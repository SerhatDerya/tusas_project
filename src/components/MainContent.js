import Ucuslar from "./Ucuslar";
import Orders from "./Orders";

function MainContent({ activeIndex, onEdit, orders, onDelete,onCreate }){
    const contents = [<Orders onEdit={onEdit} orders={orders} onDelete={onDelete} onCreate={onCreate} />,<Ucuslar />]
    console.log(activeIndex);
    return contents[activeIndex];
}

export default MainContent;
