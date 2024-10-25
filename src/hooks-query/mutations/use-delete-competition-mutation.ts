import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";

export const useDeleteCompetitionMutation = () => {
  return useMutation<IDataResponseFromAPI<null>, Error, number, unknown>({
    mutationFn: (competitionID) => deleteCompetition(competitionID),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if delete competition successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error delete competition: ", err);
    },
  });
};

export async function deleteCompetition(
  data: number
): Promise<IDataResponseFromAPI<null>> {
  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/competitions?id=${data}`,
      {
        method: "DELETE",
        // headers: {},
      }
    );
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error delete competition:", error);
    throw error;
  }
}
