import { ParamsGetAllArticleForAuthorWithFilter } from "./use-get-article-for-author-with-filter";
import { ParamsGetPublicationArticleForAdminIncludeContributor } from "./use-get-article-for-super-admin";
import { ParamsGetAllArticleForSystem } from "./use-get-article-for-system";
import { ParamsGetListCompetition } from "./use-get-competitions";
import { ParamsGetListAccount } from "./use-get-list-account";
import { ParamsGetReviewCommitteeForEachResearchTopic } from "./use-get-list-reviewer-foreach-research-topic";
import { ParamsGetListPostForOrganizer } from "./use-get-posts-for-organizer";
import { ParamsGetListRegistrationForm } from "./use-get-registrationform-competition";
import { ParamsGetListResearchTopicForAuthorByRolename } from "./use-get-research-topic-for-author";
import { ParamsGetListResearchTopicForReviewer } from "./use-get-research-topic-for-reviewer";
import { ParamsGetListResearchTopicForeachCompetition } from "./use-get-research-topic-foreach-competition";
import { ParamsGetListReviewCouncilForEachCompetition } from "./use-get-review-council-each-competition";
import { ParamsGetStatisticForOrganizer } from "./use-get-statistic-for-organizer";

export const queryKeys = {
  // appSettings: (filters: Record<string, any> | string) => [
  //   "app-settings",
  //   filters,
  // ],
  // myProfile: ["my-profile"],
  // userProfile: (userId: number) => ["user-profile", { userId }],

  posts: ["posts"],
  competitions: ["competitions"],
  userProfile: ["userProfile"],
  registrationCompetitionDetailForAuthor: [
    "registrationCompetitionDetailForAuthor",
  ],
  reviewCouncilDetail: (id: number) => ["reviewCouncilDetail", { id }],
  registrationCompetitionDetail: (id: number) => [
    "registrationCompetitionDetail",
    { id },
  ],
  listPost: (params: ParamsGetListPostForOrganizer) => [
    "listPost",
    JSON.stringify(params),
  ],
  postDetail: (id: number) => ["postDetail", { id }],
  listCompetition: (params: ParamsGetListCompetition) => [
    "listCompetition",
    JSON.stringify(params),
  ],
  listCompetitionAdmin: ["listCompetitionAdmin"],
  competitionDetail: (id: number) => ["competitionDetail", { id }],
  listRegistrationForm: (params: ParamsGetListRegistrationForm) => [
    "listRegistrationForm",
    JSON.stringify(params),
  ],
  listNotification: ["listNotification"],
  listDiscipline: ["listDiscipline"],
  listAuthorArticle: (params: ParamsGetAllArticleForAuthorWithFilter) => [
    "listAuthorArticle",
    JSON.stringify(params),
  ],
  listForAdminArticle: (
    params: ParamsGetPublicationArticleForAdminIncludeContributor
  ) => ["listForAdminArticle", JSON.stringify(params)],
  listArticleForSystem: (params: ParamsGetAllArticleForSystem) => [
    "listArticleForSystem",
    JSON.stringify(params),
  ],
  articleDetail: (id: number) => ["articleDetail", { id }],
  listFaculty: ["listFaculty"],
  researchTopicDetail: (id: number) => ["researchTopicDetail", { id }],
  versionOfResearchTopic: (id: number) => ["versionOfResearchTopic", { id }],
  listConclude: ["listConclude"],
  listAuthorResearchTopic: (
    params: ParamsGetListResearchTopicForAuthorByRolename
  ) => ["listAuthorResearchTopic", JSON.stringify(params)],
  listReviewCouncilForEachCompetition: (
    params: ParamsGetListReviewCouncilForEachCompetition
  ) => ["listReviewCouncilForEachCompetition", JSON.stringify(params)],
  listResearchTopicForeachCompetition: (
    params: ParamsGetListResearchTopicForeachCompetition
  ) => ["listResearchTopicForeachCompetition", JSON.stringify(params)],
  listReviewCommitteeForEachResearchTopic: (
    params: ParamsGetReviewCommitteeForEachResearchTopic
  ) => ["listReviewCommitteeForEachResearchTopic", JSON.stringify(params)],
  listReviewerResearchTopic: (
    params: ParamsGetListResearchTopicForReviewer
  ) => ["listReviewerResearchTopic", JSON.stringify(params)],
  listAcceptanceForAllRole: ["listAcceptanceForAllRole"],
  statisticForOrganizer: (params: ParamsGetStatisticForOrganizer) => [
    "statisticForOrganizer",
    JSON.stringify(params),
  ],
  acceptanceDetail: ["acceptanceDetail"],
  listAccountManagement: (params: ParamsGetListAccount) => [
    "listAccountManagement",
    JSON.stringify(params),
  ],
};
