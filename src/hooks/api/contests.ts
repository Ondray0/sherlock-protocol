import { useCallback, useEffect, useMemo } from "react"
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { useAccount, useSignTypedData } from "wagmi"
import { contests as contestsAPI } from "./axios"
import {
  getContests as getContestsUrl,
  getContest as getContestUrl,
  contestOptIn as contestOptInUrl,
  getContestant as getContestantUrl,
  getScoreboard as getScoreboardUrl,
} from "./urls"

export type ContestStatus = "CREATED" | "RUNNING" | "JUDGING" | "FINISHED" | "ESCALATING" | "SHERLOCK_JUDGING"

export type Contest = {
  id: number
  title: string
  shortDescription: string
  description?: string
  report?: string
  logoURL?: string
  prizePool: number
  startDate: number // Timestamp in seconds.
  endDate: number // Timestamp in seconds.
  status: ContestStatus
  leadSeniorAuditorFixedPay: number
  leadSeniorAuditorHandle: string
  private: boolean
}

export type Contestant = {
  repo: string
  countsTowardsRanking: boolean
  handle: string
  isTeam: boolean
}

export type Scoreboard = {
  handle: string
  senior: boolean
  isTeam: boolean
  score: number
  contestDays: number
  payouts: number
}[]

type GetContestsResponseData = {
  id: number
  title: string
  short_description: string
  logo_url: string
  prize_pool: number
  starts_at: number
  ends_at: number
  status: ContestStatus
  lead_senior_auditor_fixed_pay: number
  lead_senior_auditor_handle: string
  private: boolean
}[]

export const contestsQueryKey = "contests"
export const useContests = () =>
  useQuery<Contest[], Error>(contestsQueryKey, async () => {
    const { data: response } = await contestsAPI.get<GetContestsResponseData>(getContestsUrl())

    return response.map((d) => ({
      id: d.id,
      title: d.title,
      shortDescription: d.short_description,
      logoURL: d.logo_url,
      prizePool: d.prize_pool,
      startDate: d.starts_at,
      endDate: d.ends_at,
      status: d.status,
      leadSeniorAuditorFixedPay: d.lead_senior_auditor_fixed_pay,
      leadSeniorAuditorHandle: d.lead_senior_auditor_handle,
      private: d.private,
    }))
  })

type GetContestResponseData = {
  id: number
  title: string
  short_description: string
  logo_url: string
  prize_pool: number
  starts_at: number
  ends_at: number
  status: ContestStatus
  description?: string
  report?: string
  lead_senior_auditor_fixed_pay: number
  lead_senior_auditor_handle: string
  private: boolean
}

export const contestQueryKey = (id: number) => ["contest", id]
export const useContest = (id: number) =>
  useQuery<Contest, Error>(contestQueryKey(id), async () => {
    const { data: response } = await contestsAPI.get<GetContestResponseData>(getContestUrl(id))

    return {
      id: response.id,
      title: response.title,
      shortDescription: response.short_description,
      logoURL: response.logo_url,
      prizePool: response.prize_pool,
      startDate: response.starts_at,
      endDate: response.ends_at,
      status: response.status,
      description: response.description,
      report: response.report,
      leadSeniorAuditorFixedPay: response.lead_senior_auditor_fixed_pay,
      leadSeniorAuditorHandle: response.lead_senior_auditor_handle,
      private: response.private,
    }
  })

type GetContestantResponseData = {
  repo_name: string
  counts_towards_ranking: boolean
  handle: string
  is_team: boolean
} | null
export const contestantQueryKey = (address: string, contestId: number) => ["contestant", address, contestId]
export const useContestant = (address: string, contestId: number, opts?: UseQueryOptions<Contestant | null, Error>) =>
  useQuery<Contestant | null, Error>(
    contestantQueryKey(address, contestId),
    async () => {
      try {
        const { data } = await contestsAPI.get<GetContestantResponseData>(getContestantUrl(address, contestId))

        if (!data) return null

        return {
          repo: data.repo_name,
          countsTowardsRanking: data.counts_towards_ranking,
          handle: data.handle,
          isTeam: data.is_team,
        }
      } catch (error) {
        return null
      }
    },
    opts
  )

export const useOptInOut = (contestId: number, optIn: boolean, handle: string) => {
  const domain = {
    name: "Sherlock Contest",
    version: "1",
  }

  const types = {
    RankingOptIn: [
      { name: "contest_id", type: "uint256" },
      { name: "opt_in", type: "bool" },
    ],
  }

  const value = {
    opt_in: optIn,
    contest_id: contestId,
  }

  const { signTypedData, data: signature, isLoading: signatureIsLoading } = useSignTypedData({ domain, types, value })
  const { address } = useAccount()
  const queryClient = useQueryClient()

  const { isLoading: mutationIsLoading, mutateAsync: doOptIn } = useMutation(async () => {
    await contestsAPI.post(contestOptInUrl(), {
      contest_id: contestId,
      opt_in: optIn,
      signature,
      handle,
    })
  })

  useEffect(() => {
    const optInOut = async () => {
      if (signature) {
        await doOptIn()
        await queryClient.invalidateQueries(contestantQueryKey(address ?? "", contestId))
      }
    }
    optInOut()
  }, [signature, doOptIn, address, contestId, queryClient])

  const signAndOptIn = useCallback(() => {
    signTypedData()
  }, [signTypedData])

  return useMemo(
    () => ({ isLoading: mutationIsLoading || signatureIsLoading, signAndOptIn }),
    [mutationIsLoading, signatureIsLoading, signAndOptIn]
  )
}

type GetScoreboardResponseData = {
  handle: string
  is_team: boolean
  senior: boolean
  score: number
  days: number
  payout: number
}[]

export const scoreboardQueryKey = () => "scoreboard"
export const useScoreboard = () =>
  useQuery<Scoreboard, Error>(scoreboardQueryKey(), async () => {
    const { data } = await contestsAPI.get<GetScoreboardResponseData>(getScoreboardUrl())

    return data.map((d) => ({
      handle: d.handle,
      senior: d.senior,
      isTeam: d.is_team,
      score: d.score,
      contestDays: d.days,
      payouts: d.payout,
    }))
  })
