"use client";

import { VersionOfResearchProjectTopic } from "@/types/VersionOfResearchProjectTopic";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { useGetListFaculty } from "@/hooks-query/queries/use-get-faculties";
import { useGetListConclude } from "@/hooks-query/queries/use-get-conclude";
import FormField from "../FormCard/FormInputField";
import { useForm } from "react-hook-form";
import {
  TFormReviewTopic,
  TFormUpdateOrganizer,
} from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormReviewTopicSchema,
  FormUpdateOrganizerSchema,
} from "../FormCard/ZodSchema";
import { Button } from "antd";

interface IProps {
  version: VersionOfResearchProjectTopic;
}

const FormReviewTopic = (props: IProps) => {
  const { version } = props;

  const { data: concludes } = useGetListConclude();
  const listConclude: SelectItem[] | undefined = concludes?.data.map(
    (item) => ({
      id: item.id,
      name: item.result,
    })
  );

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormReviewTopic>({
    resolver: zodResolver(FormReviewTopicSchema),
    defaultValues: {},
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormReviewTopic) => {
    console.log("Check content: ", data.content);
    console.log("Check concludeID: ", data.concludeId);

    // GỌI API PHẢN BIỆN

    // RESET FORM UPDATE
    reset({});
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  return (
    <div>
      <div>
        <h4 className="font-semibold mb-2">Nội dung chỉnh sửa của version:</h4>
        <p className="text-justify">{version.summary}</p>
      </div>
      <div className="">Hiển thị ra kết quả phản biện (nếu chưa phản biện)</div>
      <div>
        <h4 className="font-semibold mb-2">
          Phần nhận xét của người phản biện:
        </h4>
        <div>
          <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
            Nhận xét
          </label>
          <FormField
            type="text"
            placeholder="Nhập nhận xét ..."
            name="content"
            register={register}
            error={errors.content}
            isTextArea={true}
            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
          />
        </div>
        <div>
          <FormSelect
            name="concludeId"
            items={listConclude || []}
            register={register}
            error={errors.concludeId}
            label="Kết luận"
            className="relative basis-1/2 z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
          />
        </div>
        <div className="mt-3">
          <Button
            onClick={handleSubmit(onSubmit, onError)}
            className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FormReviewTopic;
