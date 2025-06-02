import * as yup from 'yup';
import { InferType } from 'yup';

export const loginSchema = yup.object({
email: yup.string().email('تنسيق البريد الإلكتروني غير صالح').required('البريد الالكتروني مطلوب'),
    password: yup.string().min(6, "كلمة المرور يجب ان لا تقل عن 6 حروف").matches(/[A-Z]/, "يجب أن يحتوي على حرف كبير").required("كلمة المرور مطلوبة"),
})



export const registerSchema = yup.object({
  email: yup.string().email("اكتب بريد الكترني صالح").required("البريد الالكتروني مطلوب"),
  userName: yup.string().min(3,"اسم المستخدم يجب الا يقل عن ثلاث حروف").required("اسم المستخدم مطلوب"),
  password: yup.string().min(6 , "كلمة المرور يجب الا تقل عن 6 حروف").matches(/[A-Z]/, "يجب أن تحتوي على حرف كبير").required("كلمة المرور مطلوبة").matches(/[a-z]/, "يجب أن تحتوي على حرف صغير").matches(/\d/, "يجب أن تحتوي على رقم").matches(/[@$!%*?&]/, "يجب أن تحتوي على رمز خاص"),
  bsd: yup.string().required("تاريخ الميلاد مطلوب").matches(/^\d{4}-\d{2}-\d{2}$/),
  fullName: yup.string(),
  imageBase64: yup.string().nullable(),
  phoneNumber: yup.string().required("رقم الهاتف مطلوب"),
  apartmentNumber: yup.string().nullable(),
  buildingNumber: yup.string().nullable(),
  cityId: yup.number().required("المدينة مطلوبة"),
  street: yup.string().required("الشارع مطلوب"),
  postalCode: yup.string().nullable()
});

export const technicianSchema = yup.object({
  userName: yup.string().required("اسم المستخدم مطلوب"),
  email: yup.string().email("ادخل بريد إلكتروني صحيح").required("البريد الإلكتروني مطلوب"),
  password: yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
  bsd: yup.string().required("تاريخ الميلاد مطلوب"),
  fullName: yup.string().required("الاسم الكامل مطلوب"),
  imageBase64: yup.string().nullable(),
  phoneNumber: yup.string().required("رقم الهاتف مطلوب"),
  serviceId: yup.number().required("نوع الخدمة مطلوب").typeError("يجب اختيار نوع الخدمة"),
  apartmentNumber: yup.string().required("رقم الشقة مطلوب"),
  buildingNumber: yup.string().required("رقم المبنى مطلوب"),
  cityId: yup.number().required("المدينة مطلوبة").typeError("يجب اختيار المدينة"),
  street: yup.string().required("الشارع مطلوب"),
  postalCode: yup.string().required("الرمز البريدي مطلوب"),
});

export type UserCustomer = InferType<typeof registerSchema>;

export type UserTechnician = InferType<typeof technicianSchema>;
