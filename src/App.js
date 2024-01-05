import { useEffect, useState } from "react";
import Orders from './components/Orders';
import AddOrder from './components/AddOrder';
import Ucuslar from "./components/Ucuslar";
import MainContent from "./components/MainContent";
import axios from 'axios';
import { TabMenu } from 'primereact/tabmenu';
import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
        

function App(){
    const toast = useRef(null);

    const [orders, setOrders] = useState([]);

    const [activeIndex, setActiveIndex] = useState(3);

    const menuItems = [
        {label: 'Uçaklar', icon: 'pi pi-fw pi-send'},
        {label: 'Uçuşlar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Admin Paneli', icon: 'pi pi-fw pi-user'},
        {label: 'Ayarlar', icon: 'pi pi-fw pi-cog'}
    ];

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:3001/orders');

        setOrders(response.data);
    };

    useEffect(() => {
        fetchOrders();
        setActiveIndex(0);
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

        confirmDialog({
            message: 'Uçak bilgilerini değiştirme istediğinize emin misiniz?',
            header: 'Uyarı',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {

                let _orders = [...orders];
                let { newData, index } = e;

                _orders[index] = newData;

                setOrders(_orders);

                await axios.put(`http://localhost:3001/orders/${newData.id}`, {
                    "id":newData.id,
                    "ucakKodu":newData.ucakKodu,
                    "ucak":newData.ucak,
                    "musteri":newData.musteri,
                    "tarih": newData.tarih
                });
            
                toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Uçak bilgileri başarıyla değiştirildi', life: 3000 });
            },
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır'
        });

        

    };

    const deleteOrder = async (rowData) => {
        confirmDialog({
            message: 'Uçak bilgilerini silmek istediğinize emin misiniz?',
            header: 'Uyarı',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await axios.delete(`http://localhost:3001/orders/${rowData.id}`);

                const updatedOrders = orders.filter((order) => {
                    return order.id !== rowData.id;
                })

                setOrders(updatedOrders);

                toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Uçak bilgileri başarıyla silindi', life: 3000 });
            },
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır'
        });
    }

    const createOrder = async (ucak, musteri, tarih) => {
        const response = await axios.post('http://localhost:3001/orders', {
                "id": Math.floor(Math.random()*9999),
                "ucak":ucak,
                "musteri":musteri,
                "tarih":tarih
        });

        const updatedOrders = [
            ...orders,
            response.data
            ];

        setOrders(updatedOrders);
    }

    return <div>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TabMenu model={menuItems} className="tabMenu" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>
        <MainContent activeIndex={activeIndex} onEdit={editOrder} orders={orders} onDelete={deleteOrder} onCreate={createOrder} />
        {/* <Orders onEdit={editOrder} orders={orders} onDelete={deleteOrder} />
        <Ucuslar onEdit={editOrder} orders={orders} onDelete={deleteOrder} /> */}
    </div>
}

export default App;
