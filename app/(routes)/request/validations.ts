import * as yup from "yup";

export const requestSchema = yup.object({
  service: yup.object({
    id: yup.number().required("يرجى اختيار الخدمة"),
    name: yup.string().required(),
  }).required("يرجى اختيار الخدمة"),

  governorate: yup.object({
    id: yup.number().required("يرجى اختيار المحافظة"),
    name: yup.string().required(),
  }).required("يرجى اختيار المحافظة"),

  city: yup.object({
    id: yup.number().required("يرجى اختيار المدينة"),
    name: yup.string().required(),
    governorateName: yup.string().required(),
  }).required("يرجى اختيار المدينة"),

  location: yup.string()
    .required("يرجى إدخال العنوان التفصيلي")
    .min(10, "العنوان يجب أن يكون 10 أحرف على الأقل")
    .max(200, "العنوان يجب أن لا يتجاوز 200 حرف"),

  description: yup.string()
    .required("يرجى إدخال وصف للمشكلة")
    .min(20, "الوصف يجب أن يكون 20 حرف على الأقل")
    .max(1000, "الوصف يجب أن لا يتجاوز 1000 حرف"),

  date: yup.date()
    .required("يرجى اختيار التاريخ والوقت")
    .min(new Date(), "يرجى اختيار تاريخ ووقت مستقبلي"),

  technician: yup.object({
    id: yup.number().required("يرجى اختيار الفني"),
    fullName: yup.string().required(),
  }).required("يرجى اختيار الفني"),

  attachmentBase64: yup.string().default(""),
});

export type RequestFormData = yup.InferType<typeof requestSchema>; 