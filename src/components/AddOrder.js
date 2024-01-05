import { useState } from "react";
import { Button } from 'primereact/button';
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

function AddOrder({ onCreate }){
    const [ucak, setUcak] = useState("");
    const [musteri, setMusteri] = useState("");
    const [tarih, setTarih] = useState("");

    const op = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tarih_parsed = tarih.getDate()+"/"+(tarih.getMonth()+1)+"/"+tarih.getFullYear();
        onCreate(ucak,musteri,tarih_parsed);
        op.current.toggle(e);
        setUcak('');
        setMusteri('');
        setTarih('');
    }

    return <div>
        <Button type="button" icon="pi pi-plus" label="Ekle" style={{marginBottom:'1rem'}} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                    <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-send"></i>
                        </span>
                        <Dropdown placeholder="Uçak" value={ucak} options={["Aksungur","Anka","Gökbey","Hürjet"]} onChange={(e) => setUcak(e.target.value)} />
                    </div>

                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Müşteri" value={musteri} onChange={(e) => setMusteri(e.target.value)} />
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
