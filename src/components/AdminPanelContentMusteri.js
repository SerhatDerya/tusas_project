import { useRef, useState } from "react";
import axios from "axios";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

function AdminPanelContentMusteri({ toast, musterilerTable }){

  const [musteri, setMusteri] = useState("");
  const op = useRef(null);
  const [musteriler, setMusteriler] = useState(musterilerTable);

  const onRowEditComplete = (e) => {
    confirmDialog({
        message: 'Müşteri bilgilerini değiştirmek istediğinize emin misiniz?',
        header: 'Uyarı',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            let _data = [...musteriler];
            let { newData, index } = e;
  
            _data[index] = newData;
  
            setMusteriler(_data);
  
            await axios.put(`http://localhost:8081/musteriler/${newData.id}`, {
                "id":newData.id,
                "musteriAdi":newData.musteriAdi
            });
        
            toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Müşteri bilgileri başarıyla değiştirildi', life: 3000 });
        },
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır'
    });
  };

  const onDelete = (rowData) => {
    confirmDialog({
        message: 'Müşteriyi silmek istediğinize emin misiniz?',
        header: 'Uyarı',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
  
            await axios.delete(`http://localhost:8081/musteriler/${rowData.id}`);
  
            const updatedMusteriler = musteriler.filter((mus) => {
                return mus.id !== rowData.id;
            })
  
            setMusteriler(updatedMusteriler);
  
            toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Müşteri bilgileri başarıyla silindi', life: 3000 });
        },
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır'
    });
  }

  const onCreateMusteri = async (musteri) => {
    const response = await axios.post('http://localhost:8081/musteriler', {
            "id": Math.floor(Math.random()*9999),
            "musteriAdi":musteri
    });

    const response_parsed = JSON.parse(response.config.data)

    const updatedMusteriler = [
        ...musteriler,
        response_parsed
        ];

    setMusteriler(updatedMusteriler);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      onCreateMusteri(musteri);
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
        <DataTable value={musteriler} stripedRows editMode="row"  dataKey="id" onRowEditComplete={onRowEditComplete} className='adminDataTable'>
                <Column  field={"id"} header={"ID"} ></Column>
                <Column  field={"musteriAdi"} header={"Müşteriler"} editor={(options) => textEditor(options)}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={BodyTemplate}></Column>
        </DataTable>
        <div className="addUcakTipiBtn">
        <Button type="button" icon="pi pi-plus"  label="Müşteri Ekle" style={{marginBottom:'1rem'}} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                    <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Müşteri Adı" value={musteri} onChange={(e) => setMusteri(e.target.value)} />
                    </div>
                  
                    <Button type='Button' icon="pi pi-save" label='Kaydet' onClick={handleSubmit} />
                </div>
            </OverlayPanel>
        </div>
    </div>
)

}

export default AdminPanelContentMusteri;
