"use client";
import {
  ParamsGetListRegistrationForm,
  useGetListRegistrationForm,
} from "@/hooks-query/queries/use-get-registrationform-competition";
import { RegistrationFormForAdmin } from "./RegistrationFormForAdmin";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "antd";

interface IProps {
  competition: Competition;
  isAccepted: number;
}
const ListRegistrationForEachCompetition = (props: IProps) => {
  const { competition, isAccepted } = props;
  // console.log("check props: ", competition.id, isAccepted);
  // render ra danh sách phiếu đăng kí
  const params: ParamsGetListRegistrationForm = {
    competitionId: competition.id,
    index: 1,
    pageSize: 100,
    isAccepted: isAccepted,
  };

  // console.log("Checking params: ", JSON.stringify(params));
  const { data: listRegisForm, refetch } = useGetListRegistrationForm(params);

  useEffect(() => {
    refetch();
  }, [competition, isAccepted]);

  console.log(
    "checking registration list: ",
    JSON.stringify(listRegisForm, null, 2)
  );
  return (
    <div>
      {isAccepted === 0 ? (
        <Badge.Ribbon
          text={
            listRegisForm?.data?.items?.length &&
            listRegisForm.data.items.length > 0
              ? listRegisForm.data.items.length
              : ""
          }
          color="red"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h3 className="">{competition.competitionName}</h3>
              </AccordionTrigger>
              <AccordionContent>
                {listRegisForm?.data.items?.map((item, index) => {
                  return (
                    <div>
                      <RegistrationFormForAdmin
                        registerForm={item}
                        isAccepted={isAccepted}
                      />
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Badge.Ribbon>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="">{competition.competitionName}</h3>
            </AccordionTrigger>
            <AccordionContent>
              {listRegisForm?.data.items?.map((item, index) => {
                return (
                  <div>
                    <RegistrationFormForAdmin
                      registerForm={item}
                      isAccepted={isAccepted}
                    />
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};
export { ListRegistrationForEachCompetition };
