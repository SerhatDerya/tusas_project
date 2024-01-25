import { useEffect, useState } from "react";
import MainContent from "./components/MainContent";
import axios from 'axios';
import { TabMenu } from 'primereact/tabmenu';
import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
        

function App(){
    const toast = useRef(null);

    const [orders, setOrders] = useState([]);
    const [musteriler, setMusteriler] = useState([]);
    const [musterilerTable, setMusterilerTable] = useState([]);
    const [ucakTipleri, setUcakTipleri] = useState([]);
    const [ucakTipleriTable, setUcakTipleriTable] = useState([]);
    const [lokasyonlar, setLokasyonlar] = useState([]);
    const [lokasyonlarTable, setLokasyonlarTable] = useState([]);

    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        {label: 'Uçaklar', icon: 'pi pi-fw pi-send'},
        {label: 'Uçuşlar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Admin Paneli', icon: 'pi pi-fw pi-user'},
        {label: 'Ayarlar', icon: 'pi pi-fw pi-cog'}
    ];

    const fetchLokasyonlar = async () => {
        const response = await axios.get("http://localhost:8081/lokasyonlar");
        setLokasyonlarTable(response.data);

        const arr = [];
        for (let i = 0; i < response.data.length; i++) {
            arr.push(response.data[i]["lokasyonAdi"]);
        }
        setLokasyonlar(arr);
    };


    const fetchUcakTipleri = async () => {
        const response = await axios.get("http://localhost:8081/ucakTipleri");
        setUcakTipleriTable(response.data);

        const arr = [];
        for (let i = 0; i < response.data.length; i++) {
            arr.push(response.data[i]["ucakTipi"]);
        }
        setUcakTipleri(arr);
    };

    const fetchMusteriler = async () => {
        const response = await axios.get("http://localhost:8081/musteriler");
        setMusterilerTable(response.data);

        const arr = [];
        for (let i = 0; i < response.data.length; i++) {
            arr.push(response.data[i]["musteriAdi"]);
        }
        setMusteriler(arr);
    };

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:8081/orders');
        console.log(response.data)
        setOrders(response.data);
    };

    useEffect(() => {
        fetchOrders();
        fetchMusteriler();
        fetchUcakTipleri();
        fetchLokasyonlar();
    }, [activeIndex]);

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
            message: 'Uçak bilgilerini değiştirmek istediğinize emin misiniz?',
            header: 'Uyarı',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {

                let _orders = [...orders];
                let { newData, index } = e;

                _orders[index] = newData;
                console.log(newData);
                setOrders(_orders);


                await axios.put(`http://localhost:8081/orders/${newData.id}`, {
                    "id":newData.id,
                    "ucakKodu":newData.ucakKodu,
                    "ucak":newData.ucak,
                    "musteri":newData.musteri,
                    "tarih": newData.tarih,
                    "toplamUcusSuresi":newData.toplamUcusSuresi
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
                await axios.delete(`http://localhost:8081/orders/${rowData.id}`);

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

    const createOrder = async (ucak, ucakKodu, musteri, tarih) => {
        const response = await axios.post('http://localhost:8081/orders', {
                "id": Math.floor(Math.random()*9999),
                "ucak":ucak,
                "ucakKodu": ucakKodu,
                "musteri":musteri,
                "tarih":tarih,
                "toplamUcusSuresi":"0sa 0dk"
        });
        const response_parsed = JSON.parse(response.config.data)
    
        const updatedOrders = [
            ...orders,
            response_parsed
            ];
        setOrders(updatedOrders);
    }

    return <div>
        <Toast ref={toast} />
        <ConfirmDialog />
        <TabMenu model={menuItems} className="tabMenu" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>
        <MainContent activeIndex={activeIndex} onEdit={editOrder} orders={orders} musteriler={musteriler} musterilerTable={musterilerTable} ucakTipleri={ucakTipleri} ucakTipleriTable={ucakTipleriTable} lokasyonlar={lokasyonlar} lokasyonlarTable={lokasyonlarTable} onDelete={deleteOrder} onCreate={createOrder} toast={toast} />
        {/* <Orders onEdit={editOrder} orders={orders} onDelete={deleteOrder} />
        <Ucuslar onEdit={editOrder} orders={orders} onDelete={deleteOrder} /> */}
    </div>
}

export default App;
