"use client";
import { AcceptanceStatistic } from "../AcceptanceStatistic/AcceptanceStatistic";
import { OverviewStatistic } from "../OverviewStatistic/OverviewStatistic";
import { ResearchTopicStatistic } from "../ResearchTopicStatistic/ResearchTopicStatistic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
const StatisticalPageForOrganizer = () => {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Thống kê tổng quan</TabsTrigger>
              {/* <TabsTrigger value="analytics">Chi tiết các đề tài</TabsTrigger> */}
              <TabsTrigger value="reports">
                Chi tiết các đề tài nghiệm thu
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 ">
              <OverviewStatistic />
            </TabsContent>
            {/* <TabsContent value="analytics" className="space-y-4">
              <ResearchTopicStatistic />
            </TabsContent> */}
            <TabsContent value="reports" className="space-y-4">
              <AcceptanceStatistic />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export { StatisticalPageForOrganizer };
