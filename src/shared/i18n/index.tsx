import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  th: {
    translation: {
      "Layout & Style": "การจัดการหน้าเว็บ",
      "HOME": "หน้าแรก",
      "PORTFOLIO":"ผลงาน",
      "ABOUT":"เกี่ยวกับ",
      "BLOG":"บทความ",
      "Form & Table":"การจัดการหน้าฟอร์ม",
      "Antecedent":"คำนำหน้า",
      "Name":"ชื่อ",
      "Last Name":"นามสกุล",
      "Birthdate":"วันที่เกิด",
      "Nationality":"สัญชาติ",
      "Thai":"ไทย",
      "thai":"ไทย",
      "Other":"อื่นๆ",
      "ID Card Number":"เลขบัตรประชาชน",
      "Sex":"เพศ",
      "Male":"ชาย",
      "Female":"หญิง",
      "Phone Number":"เบอร์โทรศัพท์",
      "Passport":"หนังสือเดิมการ",
      "Expected Salary":"เงินเดือนที่คาดหวัง",
      "Action":"การจัดการ",
      "Submit":"ส่งข้อมูล",
      "Reset":"ล้างข้อมูล",
      "Please select":"กรุณาเลือก",
      "Mr.":"นาย",
      "Miss":"นางสาว",
      "Mrs.":"นาง",
      "Delete":"ลบ",
      "Move Right":"เลื่อนไปทางขวา",
      "Move Position":"เปลี่ยนตำแหน่ง",
      "Move Left":"เลื่อนไปทางซ้าย",
      "Test 1":"แบบทดสอบที่ 1",
      "Test 2":"แบบทดสอบที่ 2",
      "Test 3":"แบบทดสอบที่ 3",
      "Connect API":"การเชื่อมต่อ API",
      "Home":"หน้าบ้าน",
      "Back":"กลับ",
    }
  },
  en: {
    translation: {
      "Layout & Style": "Layout & Style",
      "HOME": "HOME",
      "PORTFOLIO":"PORTFOLIO",
      "ABOUT":"ABOUT",
      "BLOG":"BLOG",
      "Form & Table":"Form & Table",
      "Antecedent":"Antecedent",
      "Name":"Name",
      "Last Name":"Last Name",
      "Birthdate":"Birthdate",
      "Nationality":"Nationality",
      "Thai":"Thai",
      "thai":"thai",
      "Other":"Other",
      "ID Card Number":"ID Card Number",
      "Sex":"Sex",
      "Male":"Male",
      "Female":"Female",
      "Phone Number":"Phone Number",
      "Passport":"Passport",
      "Expected Salary":"Expected Salary",
      "Action":"Action",
      "Submit":"Submit",
      "Reset":"Reset",
      "Please select":"Please select",
      "Mr.":"Mr.",
      "Miss":"Miss",
      "Mrs.":"Mrs.",
      "Delete":"Delete",
      "Move Right":"Move Right",
      "Move Position":"Move Position",
      "Move Left":"Move Left",
      "Test 1":"Test 1",
      "Test 2":"Test 2",
      "Test 3":"Test 3",
      "Connect API":"Connect API",
      "Home":"Home",
      "Back":"Back",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;