import { useState } from "react";
import { Button } from 'primereact/button';
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

function AddOrder({ onCreate, musteriler, ucakTipleri }){
    const [ucak, setUcak] = useState("");
    const [ucakKodu, setUcakKodu] = useState("");
    const [musteri, setMusteri] = useState("");
    const [tarih, setTarih] = useState("");

    const op = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tarih_parsed = tarih.getFullYear()+"-"+(tarih.getMonth()+1)+"-"+tarih.getDate();
        onCreate(ucak,ucakKodu,musteri,tarih_parsed);
        op.current.toggle(e);
        setUcak('');
        setMusteri('');
        setTarih('');
        setUcakKodu('');
    }


    return <div>
        <Button type="button" icon="pi pi-plus" label="Uçak Ekle" style={{marginBottom:'1rem'}} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                    <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-send"></i>
                        </span>
                        <InputText placeholder="Uçak Adı" value={ucakKodu} onChange={(e) => setUcakKodu(e.target.value)} />
                    </div>
                    
                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-send"></i>
                        </span>
                        <Dropdown placeholder="Uçak Türü" value={ucak} options={ucakTipleri} onChange={(e) => setUcak(e.target.value)} />
                    </div>

                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <Dropdown placeholder="Müşteri" value={musteri} options={musteriler} onChange={(e) => setMusteri(e.target.value)} />
                    </div>

                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon"><i className="pi pi-calendar"></i></span>
                        <Calendar placeholder="Üretim Tarihi" value={tarih} onChange={(e) => setTarih(e.target.value)} dateFormat="dd/mm/yy" />
                    </div>

                    <Button type='Button' icon="pi pi-save" label='Kaydet' onClick={handleSubmit} />
                </div>
            </OverlayPanel>
    </div>
}

export default AddOrder;
