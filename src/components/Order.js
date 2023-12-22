import { useState } from "react";
import EditOrder from './EditOrder';

function Order({ order, onEdit, onDelete }){
    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
        onDelete(order.id);
    };

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    const handleSubmit = () => {
        setShowEdit(false);
        onEdit();
    }

    let content = <h3>{order.ucak}, {order.musteri}</h3>

    if(showEdit){
        content = <EditOrder onSubmit={handleSubmit} order={order} />
    }

    return <div>
        <div>{content}</div>
        <div className="actions">
            <button className="edit" onClick={handleEditClick}>Edit</button>
            <button className="delete" onClick={handleDeleteClick}>Delete</button>
        </div>
    </div>;
}

export default Order;
