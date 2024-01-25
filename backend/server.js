const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
  host:"sql8.freesqldatabase.com",
  user:"sql8679674",
  password:"Af4WDiVBnT",
  database:"sql8679674"
})

app.get('/', (re, res) => {
  return res.json("From backend side");
})

app.get('/musteriler', (req, res) => {
  const sql = "SELECT * FROM musteriler";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.put('/musteriler/:id', (req, res) => {
  const req_data = [req.body.id, req.body.musteriAdi, req.params.id];
  
  const sql = "UPDATE musteriler SET id=?, musteriAdi=? WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/musteriler', (req, res) => {
  const req_data = [req.body.id, req.body.musteriAdi]
  
  const sql = "INSERT INTO musteriler values (?,?)";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.delete('/musteriler/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const sql = "DELETE FROM musteriler WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/lokasyonlar', (req, res) => {
  const sql = "SELECT * FROM lokasyonlar";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/lokasyonlar', (req, res) => {
  const req_data = [req.body.id, req.body.lokasyonAdi]
  
  const sql = "INSERT INTO lokasyonlar values (?,?)";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.put('/lokasyonlar/:id', (req, res) => {
  const req_data = [req.body.id, req.body.lokasyonAdi, req.params.id];
  
  const sql = "UPDATE lokasyonlar SET id=?, lokasyonAdi=? WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.delete('/lokasyonlar/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const sql = "DELETE FROM lokasyonlar WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/ucakTipleri', (req, res) => {
  const sql = "SELECT * FROM ucakTipleri";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.put('/ucakTipleri/:id', (req, res) => {
  const req_data = [req.body.id, req.body.ucakTipi, req.params.id];
  
  const sql = "UPDATE ucakTipleri SET id=?, ucakTipi=? WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/ucakTipleri', (req, res) => {
  const req_data = [req.body.id, req.body.ucakTipi]
  
  const sql = "INSERT INTO ucakTipleri values (?,?)";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.delete('/ucakTipleri/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const sql = "DELETE FROM ucakTipleri WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/orders', (req, res) => {
  const sql = "SELECT * FROM ucaklar";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/orders/ucakKodu/:ucakKodu', (req, res) => {
  const req_data = [req.params.ucakKodu]
  const sql = "SELECT * FROM ucaklar WHERE ucakKodu=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/orders', (req, res) => {
  const req_data = [req.body.id, req.body.ucakKodu, req.body.ucak, req.body.musteri, req.body.tarih, req.body.toplamUcusSuresi]
  
  const sql = "INSERT INTO ucaklar values (?,?,?,?,?,?)";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.put('/orders/:id', (req, res) => {
  const req_data = [req.body.id, req.body.ucakKodu, req.body.ucak, req.body.musteri, req.body.tarih, req.body.toplamUcusSuresi, req.params.id];
  
  const sql = "UPDATE ucaklar SET id=?, ucakKodu=?, ucak=?, musteri=?, tarih=?, toplamUcusSuresi=? WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.put('/orders/ucakKodu/:ucakKodu', (req, res) => {
  const req_data = [req.body.id, req.body.ucakKodu, req.body.ucak, req.body.musteri, req.body.tarih, req.body.toplamUcusSuresi, req.params.id];
  
  const sql = "UPDATE ucaklar SET id=?, ucakKodu=?, ucak=?, musteri=?, tarih=?, toplamUcusSuresi=? WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.delete('/orders/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const sql = "DELETE FROM ucaklar WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/ucuslar', (req, res) => {
  const sql = "SELECT * FROM ucuslar";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/ucuslar/ucakKoduSum/:ucakKodu', (req, res) => {
  const req_data = [req.params.ucakKodu];
  const sql = "SELECT SUM(ucusSuresi) FROM ucuslar WHERE ucakAdi=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/ucuslar', (req, res) => {
  const req_data = [req.body.id, req.body.ucakAdi, req.body.kalkisYeri, req.body.inisYeri, req.body.kalkisSaati, req.body.inisSaati, req.body.ucusSuresi]
  
  const sql = "INSERT INTO ucuslar values (?,?,?,?,?,?,?)";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.put('/ucuslar/:id', (req, res) => {
  const req_data = [req.body.id, req.body.ucakAdi, req.body.kalkisYeri, req.body.inisYeri, req.body.kalkisSaati, req.body.inisSaati, req.body.ucusSuresi, req.params.id];
  
  const sql = "UPDATE ucuslar SET id=?, ucakAdi=?, kalkisYeri=?, inisYeri=?, kalkisSaati=?, inisSaati=?, ucusSuresi=? WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/ucuslar/:id', (req, res) => {
  const req_data = [req.params.id];
  const sql = "SELECT * FROM ucuslar WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.delete('/ucuslar/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const sql = "DELETE FROM ucuslar WHERE id=?";
  db.query(sql, req_data, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.listen(8081, () => {
  console.log("listening");
})
