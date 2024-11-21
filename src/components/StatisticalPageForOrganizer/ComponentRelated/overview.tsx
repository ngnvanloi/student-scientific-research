"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

export type StatisticRateForEachCompetition = {
  competitionName: string;
  SuccessfulReviewRate: number;
  FacultyApprovalForPublicationRate: number;
  PublishedTopicsRate: number;
};

interface IProps {
  data: StatisticRateForEachCompetition[];
}
export function Overview(props: IProps) {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        {/* Add grid for better visualization */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* Y Axis with percentage display */}
        <YAxis
          tickFormatter={(value) => `${value}%`}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        {/* X Axis for contests */}
        <XAxis
          dataKey="competitionName"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={true}
        />

        {/* Tooltip for hover information */}
        <Tooltip formatter={(value) => `${value}%`} />

        {/* Legend to indicate which bar represents which ratio */}
        <Legend />

        {/* Bars for the group */}
        <Bar
          dataKey="SuccessfulReviewRate"
          fill="#8884d8"
          name="Tỷ lệ đề tài phản biện thành công"
        />
        <Bar
          dataKey="FacultyApprovalForPublicationRate"
          fill="#82ca9d"
          name="Tỷ lệ đề tài được khoa phê duyệt thành công"
        />
        <Bar
          dataKey="PublishedTopicsRate"
          fill="#ffc658"
          name="Tỷ lệ đề tài được trường phê duyệt thành công "
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
