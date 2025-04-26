import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 기본 유효성 검사 스키마 및 커스텀 훅
export const useFormValidation = (validationSchema, defaultValues = {}) => {
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return formMethods;
};

// 자주 사용하는 유효성 검사 스키마
export const validationSchemas = {
  login: yup.object({
    member_id: yup.string().required("아이디를 입력해 주세요"),
    passwd: yup.string().required("비밀번호를 입력해 주세요"),
  }),

  register: yup.object({
    member_id: yup
      .string()
      .required("아이디를 입력해 주세요")
      .matches(/^[a-zA-Z]/, "아이디의 첫문자는 영문자이어야 합니다")
      .min(4, "아이디는 최소 4자 이상이어야 합니다")
      .max(10, "아이디는 최대 10자까지 입력 가능합니다"),
    passwd: yup.string().required("비밀번호를 입력해 주세요"),
    name: yup.string().required("이름을 입력해 주세요"),
    birth: yup.string().required("생년월일을 선택해 주세요"),
    hp1: yup.string().required("휴대폰 번호를 입력해 주세요"),
    hp2: yup.string().required("휴대폰 번호를 입력해 주세요"),
    hp3: yup.string().required("휴대폰 번호를 입력해 주세요"),
    email: yup
      .string()
      .required("이메일을 입력해 주세요")
      .email("유효한 이메일 주소를 입력해 주세요"),
  }),

  qnaWrite: yup.object({
    name: yup.string().required("작성자 이름을 입력해 주세요"),
    subject: yup.string().required("제목을 입력해 주세요"),
    content: yup.string().required("내용을 입력해 주세요"),
  }),

  // 필요에 따라 다른 폼의 유효성 검사 스키마 추가
};

export default useFormValidation;
