import { useRef, useState } from "react";
import axios from "axios";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

function AdminPanelContentUcak({ ucakTipleriTable, toast }){
  const [ucakTipi, setUcakTipi] = useState("");
  const op = useRef(null);
  const [ucakTipleri, setUcakTipleri] = useState(ucakTipleriTable);

  const onRowEditComplete = (e) => {
    confirmDialog({
        message: 'Uçak Tipi bilgilerini değiştirmek istediğinize emin misiniz?',
        header: 'Uyarı',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            let _data = [...ucakTipleri];
            let { newData, index } = e;
  
            _data[index] = newData;
  
            setUcakTipleri(_data);
  
            await axios.put(`http://localhost:8081/ucakTipleri/${newData.id}`, {
                "id":newData.id,
                "ucakTipi":newData.ucakTipi
            });
        
            toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Uçak Tipi bilgileri başarıyla değiştirildi', life: 3000 });
        },
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır'
    });
  };

  const onDelete = (rowData) => {
    confirmDialog({
        message: 'Uçak Tipini silmek istediğinize emin misiniz?',
        header: 'Uyarı',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
  
            await axios.delete(`http://localhost:8081/ucakTipleri/${rowData.id}`);
  
            const updatedUcakTipleri = ucakTipleri.filter((ucakTipi) => {
                return ucakTipi.id !== rowData.id;
            })
  
            setUcakTipleri(updatedUcakTipleri);
  
            toast.current.show({ severity: 'success', summary: 'İşlem Tamamlandı', detail: 'Uçak Tipi bilgileri başarıyla silindi', life: 3000 });
        },
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır'
    });
  }

  const onCreateUcakTipi = async (ucakTipi) => {
    const response = await axios.post('http://localhost:8081/ucakTipleri', {
            "id": Math.floor(Math.random()*9999),
            "ucakTipi":ucakTipi
    });

    const response_parsed = JSON.parse(response.config.data);
    const updatedUcakTipleri = [
        ...ucakTipleri,
        response_parsed
        ];

    setUcakTipleri(updatedUcakTipleri);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      onCreateUcakTipi(ucakTipi);
      //onCreate(ucak,ucakKodu,musteri,tarih_parsed);
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
        <DataTable value={ucakTipleri} stripedRows editMode="row"  dataKey="id" onRowEditComplete={onRowEditComplete} className='adminDataTable'>
                <Column  field={"id"} header={"ID"} ></Column>
                <Column  field={"ucakTipi"} header={"Uçak Tipleri"} editor={(options) => textEditor(options)}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={BodyTemplate}></Column>
        </DataTable>
        <div className="addUcakTipiBtn">
        <Button type="button" icon="pi pi-plus"  label="Uçak Tipi Ekle" style={{marginBottom:'1rem'}} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                    <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-send"></i>
                        </span>
                        <InputText placeholder="Uçak Adı" value={ucakTipi} onChange={(e) => setUcakTipi(e.target.value)} />
                    </div>
                  
                    <Button type='Button' icon="pi pi-save" label='Kaydet' onClick={handleSubmit} />
                </div>
            </OverlayPanel>
        </div>
    </div>
)

  
}

export default AdminPanelContentUcak;
