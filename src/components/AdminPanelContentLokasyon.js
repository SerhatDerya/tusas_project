import { useRef, useState } from "react";
import axios from "axios";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

function AdminPanelContentLokasyon({ toast, musterilerTable, lokasyonlarTable }){

  const [lokasyon, setLokasyon] = useState("");
  const op = useRef(null);
  const [lokasyonlar, setLokasyonlar] = useState(lokasyonlarTable);

  const onRowEditComplete = (e) => {
    confirmDialog({
        message: 'Lokasyon bilgilerini değiştirmek istediğinize emin misiniz?',
        header: 'Uyarı',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            let _data = [...lokasyonlar];
            let { newData, index } = e;
  
            _data[index] = newData;
  
            setLokasyonlar(_data);
  
            await axios.put(`http://localhost:8081/lokasyonlar/${newData.id}`, {
                "id":newData.id,
                "lokasyonAdi":newData.lokasyonAdi
            });
        
            toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Lokasyon bilgileri başarıyla değiştirildi', life: 3000 });
        },
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır'
    });
  };

  const onDelete = (rowData) => {
    confirmDialog({
        message: 'Lokasyonu silmek istediğinize emin misiniz?',
        header: 'Uyarı',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
  
            await axios.delete(`http://localhost:8081/lokasyonlar/${rowData.id}`);
  
            const updatedLokasyonlar = lokasyonlar.filter((lok) => {
                return lok.id !== rowData.id;
            })
  
            setLokasyonlar(updatedLokasyonlar);
  
            toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Lokasyon bilgileri başarıyla silindi', life: 3000 });
        },
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır'
    });
  }

  const onCreateLokasyon = async (lokasyon) => {
    const response = await axios.post('http://localhost:8081/lokasyonlar', {
            "id": Math.floor(Math.random()*9999),
            "lokasyonAdi":lokasyon
    });

    const response_parsed = JSON.parse(response.config.data)

    const updatedLokasyonlar = [
        ...lokasyonlar,
        response_parsed
        ];

    setLokasyonlar(updatedLokasyonlar);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      onCreateLokasyon(lokasyon);
      op.current.toggle(e);
  }

  const BodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => onDelete(rowData)} />
        </React.Fragment>
    );
  };
  
  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };


  return (
    <div className="card flex justify-content-center adminPanelContent">
        <DataTable value={lokasyonlar} stripedRows editMode="row"  dataKey="id" onRowEditComplete={onRowEditComplete} className='adminDataTable'>
                <Column  field={"id"} header={"ID"} ></Column>
                <Column  field={"lokasyonAdi"} header={"Lokasyonlar"} editor={(options) => textEditor(options)}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={BodyTemplate}></Column>
        </DataTable>
        <div className="addUcakTipiBtn">
        <Button type="button" icon="pi pi-plus"  label="Lokasyon Ekle" style={{marginBottom:'1rem'}} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                    <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-map-marker"></i>
                        </span>
                        <InputText placeholder="Lokasyon Adı" value={lokasyon} onChange={(e) => setLokasyon(e.target.value)} />
                    </div>
                  
                    <Button type='Button' icon="pi pi-save" label='Kaydet' onClick={handleSubmit} />
                </div>
            </OverlayPanel>
        </div>
    </div>
)

}

export default AdminPanelContentLokasyon;
