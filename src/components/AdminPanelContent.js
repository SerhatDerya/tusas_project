import AdminPanelContentUcak from "./AdminPanelContentUcak";
import AdminPanelContentMusteri from "./AdminPanelContentMusteri";
import AdminPanelContentLokasyon from "./AdminPanelContentLokasyon";

function AdminPanelContent({ contentType, toast, ucakTipleriTable, musterilerTable, lokasyonlarTable }){

  const adminPanelContents = ["Admin sayfasına hoşgeldiniz. Soldaki menüden yapmak istediğiniz işlemi seçebilirsiniz.",<AdminPanelContentUcak toast={toast} ucakTipleriTable={ucakTipleriTable}/>, <AdminPanelContentMusteri toast={toast} musterilerTable={musterilerTable}/>, <AdminPanelContentLokasyon toast={toast} lokasyonlarTable={lokasyonlarTable}/>]

  return (
    adminPanelContents[contentType]
  )
}

export default AdminPanelContent;
