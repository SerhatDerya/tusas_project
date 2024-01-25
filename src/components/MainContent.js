import Ucuslar from "./Ucuslar";
import Orders from "./Orders";
import AdminPanel from "./AdminPanel";

function MainContent({ activeIndex, onEdit, orders, musteriler, musterilerTable, ucakTipleri, ucakTipleriTable, lokasyonlar, lokasyonlarTable, onDelete,onCreate,toast }){
    const contents = [<Orders onEdit={onEdit} orders={orders} musteriler={musteriler} ucakTipleri={ucakTipleri} lokasyonlar={lokasyonlar} onDelete={onDelete} onCreate={onCreate} />,<Ucuslar toast={toast} lokasyonlar={lokasyonlar}/>,<AdminPanel toast={toast} orders={orders} musteriler={musteriler} musterilerTable={musterilerTable} ucakTipleriTable={ucakTipleriTable} lokasyonlarTable={lokasyonlarTable} />]
    //console.log(activeIndex);
    return contents[activeIndex];
}

export default MainContent;
