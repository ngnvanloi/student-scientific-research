"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";

import {
  FormAddContributorSchema,
  FormReviewAssignment,
} from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Button } from "antd";
import React, { useState } from "react";
import { DatePicker } from "../DatePicker/DatePicker";
import { useToast } from "@/hooks/use-toast";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { Competition } from "@/types/Competition";
import {
  ParamsGetListReviewCouncilForEachCompetition,
  useGetListReviewCouncilForEachCompetition,
} from "@/hooks-query/queries/use-get-review-council-each-competition";
import {
  columns,
  DataTablePreviewMemberOfReviewCouncil,
} from "../DataTable/DataTablePreviewMemberOfReviewCouncil";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  ParamsReviewAssignment,
  useReviewAssignmentMutation,
} from "@/hooks-query/mutations/use-review-assignment";
import { TFormReviewAssignment } from "../FormCard/FormInputsData";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  competitionId: number | undefined;
  researchTopic: ResearchTopicWithContributors;
}
const ModalReviewAssignment = (props: IProps) => {
  const { isOpen, setIsOpen, competitionId, researchTopic } = props;
  // REACT QUERY
  let params: ParamsGetListReviewCouncilForEachCompetition = {
    competitionId: competitionId || 0,
    page: 1,
    pageSize: 10,
  };
  const { data: listReviewCouncil, refetch: refetchListReviewCouncil } =
    useGetListReviewCouncilForEachCompetition(params);

  const { mutate, isPending, isError, isSuccess } =
    useReviewAssignmentMutation();
  // VARIABLE
  const listReviewCouncilName: SelectItem[] | undefined =
    listReviewCouncil?.data.items.map((faculty) => ({
      id: faculty.id,
      name: faculty.reviewCommitteeName,
    }));
  // STATE
  const [toggleShowListCouncil, setToggleShowListCouncil] =
    useState<boolean>(false);
  const { toast } = useToast();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormReviewAssignment>({
    resolver: zodResolver(FormReviewAssignment),
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormReviewAssignment) => {
    let params: ParamsReviewAssignment = {
      review_CommitteeId: data.review_CommitteeId,
    };
    mutate(
      { researchTopicId: researchTopic.id, params: params },
      {
        onSuccess: () => {
          toast({
            title: "Thông báo",
            variant: "default",
            description: "Phân công phản biện thành công",
          });
          setIsOpen(false);
        },
        onError: (error) => {
          alert("Lỗi khi phân công phản biện: " + error);
        },
      }
    );
    // RESET FORM UPDATE
    reset({
      review_CommitteeId: 0,
    });
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 max-h-[700px] overflow-x-auto">
          <div className="bg-white rounded-md shadow-lg h-full overflow-x-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                <strong>Phân công phản biện đề tài</strong>
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              <div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <h3 className="mb-[10px] text-base font-bold text-dark dark:text-white flex gap-2">
                        <ListBulletIcon width={16} />
                        Xem chi tiết hội đồng phản biện
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      {listReviewCouncil?.data.items.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="rounded-md border px-4 py-3 font-sans text-sm mb-2"
                          >
                            <p className="font-semibold mb-3 text-blue-700">
                              {item.reviewCommitteeName}
                            </p>
                            <DataTablePreviewMemberOfReviewCouncil
                              columns={columns}
                              data={item.reviewBoardMembers}
                            />
                          </div>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="mt-5">
                <FormSelect
                  name="review_CommitteeId"
                  items={listReviewCouncilName || []}
                  register={register}
                  error={errors.review_CommitteeId}
                  label="Chọn hội đồng phản biện"
                  className="relative basis-1/2 z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-600 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
                />
              </div>
            </Dialog.Description>
            <div className="flex items-center gap-3 p-4 border-t">
              <Dialog.Close asChild>
                <Button
                  onClick={handleSubmit(onSubmit, onError)}
                  className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
                >
                  Xác nhận
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 ">
                  Hủy
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalReviewAssignment };
