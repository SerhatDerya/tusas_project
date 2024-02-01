import { useEffect, useState } from "react";
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import React from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import AddUcus from "./AddUcus";



function Ucuslar({toast, lokasyonlar}){
    const [ucuslar, setUcuslar] = useState([]);

    const fetchUcuslar = async () => {
        const response = await axios.get('http://localhost:8081/ucuslar');

        setUcuslar(response.data);
    };

    useEffect(() => {
        fetchUcuslar();
    }, []);

    const onCreate = async (ucakAdi,kalkisYeri,inisYeri,kalkisSaati,inisSaati,ucusSuresi) => {
      
        const response = await axios.post('http://localhost:8081/ucuslar', {
                "id": Math.floor(Math.random()*9999),
                "ucakAdi":ucakAdi,
                "kalkisYeri": kalkisYeri,
                "inisYeri":inisYeri,
                "kalkisSaati":kalkisSaati,
                "inisSaati":inisSaati,
                "ucusSuresi":ucusSuresi
        });

        let ucak = await axios.get(`http://localhost:8081/orders/ucakKodu/${ucakAdi}`);
        console.log(ucak)
        let toplamUcusSuresi = ucak["data"][0]["toplamUcusSuresi"];
        let saat =  parseInt(toplamUcusSuresi.split(" ")[0].replace("sa",""));
        let dakika = parseInt(toplamUcusSuresi.split(" ")[1].replace("dk",""));
        let toplamDakika = saat*60+dakika;

        const res_data = JSON.parse(response.config.data);
        let ucusSaat = parseInt(res_data["ucusSuresi"].split(" ")[0].replace("sa",""));
        let ucusDakika = parseInt(res_data["ucusSuresi"].split(" ")[1].replace("dk",""));
        let ucusToplamDakika = ucusSaat*60+ucusDakika;

        let updatedDakika = toplamDakika+ucusToplamDakika;
        let updatedSaatDakika = Math.floor(updatedDakika/60) + "sa " + Math.floor(updatedDakika%60) + "dk";

        await axios.put(`http://localhost:8081/orders/${ucak["data"][0]["id"]}`, {
                    "id": ucak["data"][0]["id"],
                    "ucakKodu": ucak["data"][0]["ucakKodu"],
                    "ucak": ucak["data"][0]["ucak"],
                    "musteri": ucak["data"][0]["musteri"],
                    "tarih": ucak["data"][0]["tarih"],
                    "toplamUcusSuresi": updatedSaatDakika
        });

        const response_parsed = JSON.parse(response.config.data)
  
        const updatedUcuslar = [
            ...ucuslar,
            response_parsed
            ];
  
        setUcuslar(updatedUcuslar);
    }

    const onEdit = async (e) => {

        confirmDialog({
            message: 'Uçuş bilgilerini değiştirme istediğinize emin misiniz?',
            header: 'Uyarı',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {

                let _ucuslar = [...ucuslar];
                let { newData, index } = e;

                _ucuslar[index] = newData;

                setUcuslar(_ucuslar);

                const ucusSuresi = Math.floor((new Date(newData.inisSaati) - new Date(newData.kalkisSaati)) / (60000 * 60)) + "sa " + Math.floor((new Date(newData.inisSaati) - new Date(newData.kalkisSaati)) / 60000)%60 + "dk";
                console.log("kalkis:" + newData.kalkisSaati + ", inis:" + newData.inisSaati + ", ucussure:" + ucusSuresi );

                const old_ucus = await axios.get(`http://localhost:8081/ucuslar/${newData.id}`);
                const old_ucusSuresi = old_ucus["data"][0]["ucusSuresi"];
                const old_ucusSuresiDk = parseInt(old_ucusSuresi.split("sa")[0]*60) + parseInt(old_ucusSuresi.split("sa")[1]);
                const ucusSuresiDk = (new Date(newData.inisSaati) - new Date(newData.kalkisSaati))/60000;
                const sureFarkDk = ucusSuresiDk - old_ucusSuresiDk;
                console.log(sureFarkDk);
                const old_ucak = await axios.get(`http://localhost:8081/orders/ucakKodu/${newData.ucakAdi}`);
                const old_ucakTopUcusSuresi = old_ucak["data"][0]["toplamUcusSuresi"];
                const old_ucakTopUcusSuresiDk = parseInt(old_ucakTopUcusSuresi.split("sa")[0]*60) + parseInt(old_ucakTopUcusSuresi.split("sa")[1]);

                const new_ucakTopUcusSuresiDk = old_ucakTopUcusSuresiDk + sureFarkDk;
                const new_ucakTopUcusSuresi = Math.floor(new_ucakTopUcusSuresiDk/60) + "sa " + Math.floor(new_ucakTopUcusSuresiDk%60) + "dk";
                console.log(new_ucakTopUcusSuresi);
                await axios.put(`http://localhost:8081/orders/ucakKodu/${newData.ucakAdi}`, {
                    "id":old_ucak["data"][0]["id"],
                    "ucakKodu":old_ucak["data"][0]["ucakKodu"],
                    "ucak":old_ucak["data"][0]["ucak"],
                    "musteri":old_ucak["data"][0]["musteri"],
                    "tarih":old_ucak["data"][0]["tarih"],
                    "toplamUcusSuresi": new_ucakTopUcusSuresi,
                });

                await axios.put(`http://localhost:8081/ucuslar/${newData.id}`, {
                    "id":newData.id,
                    "ucakAdi":newData.ucakAdi,
                    "kalkisYeri":newData.kalkisYeri,
                    "inisYeri":newData.inisYeri,
                    "kalkisSaati":newData.kalkisSaati,
                    "inisSaati":newData.inisSaati,
                    "ucusSuresi": ucusSuresi,
                });

                toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Uçuş bilgileri başarıyla değiştirildi', life: 3000 });
            },
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır'
        });

        

    };

    const onDelete = async (rowData) => {
        confirmDialog({
            message: 'Uçuş bilgilerini silmek istediğinize emin misiniz?',
            header: 'Uyarı',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                let ucus = await axios.get(`http://localhost:8081/ucuslar/${rowData.id}`);
                
                await axios.delete(`http://localhost:8081/ucuslar/${rowData.id}`);

                const updatedUcuslar = ucuslar.filter((ucus) => {
                    return ucus.id !== rowData.id;
                })

                setUcuslar(updatedUcuslar);
                
                let ucak = await axios.get(`http://localhost:8081/orders/ucakKodu/${ucus["data"][0]["ucakAdi"]}`);
                
                let toplamUcusSuresi = ucak["data"][0]["toplamUcusSuresi"];
                
                let saat =  parseInt(toplamUcusSuresi.split(" ")[0].replace("sa",""));
                let dakika = parseInt(toplamUcusSuresi.split(" ")[1].replace("dk",""));
                let toplamDakika = saat*60+dakika;

                let deletedUcusSaat = parseInt(ucus["data"][0]["ucusSuresi"].split(" ")[0].replace("sa",""));
                let deletedUcusDakika = parseInt(ucus["data"][0]["ucusSuresi"].split(" ")[1].replace("dk",""));
                let deletedUcusToplamDakika = deletedUcusSaat*60+deletedUcusDakika;

                let updatedDakika = toplamDakika-deletedUcusToplamDakika;
                let updatedSaatDakika = Math.floor(updatedDakika/60) + "sa " + Math.floor(updatedDakika%60) + "dk";

                await axios.put(`http://localhost:8081/orders/${ucak["data"][0]["id"]}`, {
                    "id": ucak["data"][0]["id"],
                    "ucakKodu": ucak["data"][0]["ucakKodu"],
                    "ucak": ucak["data"][0]["ucak"],
                    "musteri": ucak["data"][0]["musteri"],
                    "tarih": ucak["data"][0]["tarih"],
                    "toplamUcusSuresi": updatedSaatDakika
                });


                toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Uçuş bilgileri başarıyla silindi', life: 3000 });
            },
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır'
        });
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const dateEditor = (options) => {
        
        return <Calendar value={new Date(options.value)} onChange={(e) => options.editorCallback(e.target.value.getFullYear()+"-"+(e.target.value.getMonth()+1)+"-"+e.target.value.getDate()+" "+e.target.value.getHours()+":"+e.target.value.getMinutes()+":00")} showTime hourFormat='24' dateFormat="yy/mm/dd" />
    }

    const dropdownEditor = (options) => {
        
        return <Dropdown value={options.value} options={lokasyonlar} onChange={(e) => options.editorCallback(e.target.value)} />
    }

    const onRowEditComplete = (e) => {
        onEdit(e);
    };
    
    const BodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => onDelete(rowData)} />
            </React.Fragment>
        );
    };


    return(
        <div className="card">
            <AddUcus onCreate={ onCreate } lokasyonlar={lokasyonlar}/>
            <DataTable value={ucuslar} stripedRows editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete}  tableStyle={{ minWidth: '50rem' }}>
                <Column  field="id" header="Uçuş Id"></Column>
                <Column field="ucakAdi" header="Uçak Adı"  editor={(options) => textEditor(options)}></Column>
                <Column field="kalkisYeri" header="Kalkış Yeri" editor={(options) => dropdownEditor(options)}></Column>
                <Column field='inisYeri' header="İniş Yeri" editor={(options) => dropdownEditor(options)}></Column>
                <Column field='kalkisSaati' header="Kalkış Saati" editor={(options) => dateEditor(options)}></Column>
                <Column field='inisSaati' header="İniş Saati" editor={(options) => dateEditor(options)}></Column>
                <Column field='ucusSuresi' header="Uçuş Süresi"></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={BodyTemplate}></Column>
            </DataTable>
        </div>
    )
}

export default Ucuslar;
