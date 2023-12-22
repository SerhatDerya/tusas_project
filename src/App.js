import { useEffect, useState } from "react";
import Orders from './components/Orders';
import AddOrder from './components/AddOrder';
import axios from 'axios';
        

function App(){
    const [orders, setOrders] = useState([]);
    const [ucak, setUcak] = useState();
    const [musteri, setMusteri] = useState();

    

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:3001/orders');

        setOrders(response.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const editOrder = async (e) => {
        /* const response = await axios.put(`http://localhost:3001/orders/${id}`, {
            "ucak":ucak,
            "musteri":musteri
        });

        const updatedOrders = orders.map((order) => {
            if(order.id === id){
                return {...order, ...response.data};
            }

            return order;
        })

        setOrders(updatedOrders); */

        let _orders = [...orders];
        let { newData, index } = e;

        _orders[index] = newData;

        setOrders(_orders);

        const response = await axios.put(`http://localhost:3001/orders/${newData.id}`, {
            "id":newData.id,
            "ucak":newData.ucak,
            "musteri":newData.musteri
        });
    };

    const deleteOrder = async (rowData) => {
        await axios.delete(`http://localhost:3001/orders/${rowData.id}`);

        const updatedOrders = orders.filter((order) => {
            return order.id !== rowData.id;
        })

        setOrders(updatedOrders);
    }

    const createOrder = async (ucak, musteri) => {
        const response = await axios.post('http://localhost:3001/orders', {
                "id": Math.floor(Math.random()*9999),
                "ucak":ucak,
                "musteri":musteri
        });

        const updatedOrders = [
            ...orders,
            response.data
            ];

        setOrders(updatedOrders);
    }

    return <div>
        <AddOrder onCreate={createOrder} />
        <Orders onEdit={editOrder} orders={orders} onDelete={deleteOrder} />
    </div>
}

export default App;
