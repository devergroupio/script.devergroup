import { ApolloQueryResult } from "apollo-client";
import randomString from "randomstring";
import { ProjectBuilder } from "~@/__fixtures__/utils.fixture";
import {
    isAcceptAbleProject,
    isAcceptableSkills,
    isExist,
    isExpectedBudget,
    isHighRate,
    isQualitiedDescription
    /* isReadableLanguage */
} from "~@/core/modules/freelancer/functions/filters";
import filterProjects from "~@/core/modules/freelancer/functions/fl_filter_job";
import gqlClient from "~@/core/modules/hasura.module";
import { fetchFilterSettings } from "~@/graphql/generated/fetchFilterSettings";
import { fetchProjectById } from "~@/graphql/generated/fetchProjectById";
import { DeepPartial } from "~@/types";

describe("filterProjects function", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        (jest.spyOn(gqlClient, "query") as jest.SpyInstance<
            Promise<DeepPartial<ApolloQueryResult<fetchFilterSettings>>>
        >).mockResolvedValueOnce({
            data: {
                filterSettings: [
                    {
                        id: 0,
                        description_length: 0,
                        max_budget: 0,
                        min_budget: 0
                    }
                ],
                ignoredSkills: []
            }
        });

        (jest.spyOn(gqlClient, "mutate") as jest.SpyInstance).mockResolvedValue({});
    });

    it(`shouldn't include existed projects`, async () => {
        (jest.spyOn(gqlClient, "query") as jest.SpyInstance<Promise<DeepPartial<ApolloQueryResult<fetchProjectById>>>>)
            .mockResolvedValueOnce({
                data: {
                    projects: []
                }
            })
            .mockResolvedValueOnce({
                data: {
                    projects: [
                        {
                            id: 1
                        }
                    ]
                }
            });
        const projects = [new ProjectBuilder().setId(1).build(), new ProjectBuilder().setId(2).build()];
        const filteredPorjects = await filterProjects(projects, [isExist]);
        expect(filteredPorjects.length).toEqual(1);
    });

    it(`should only include projects which hasn't any ignoredSkill`, async () => {
        jest.spyOn(gqlClient, "query").mockReset();

        (jest.spyOn(gqlClient, "query") as jest.SpyInstance<
            Promise<DeepPartial<ApolloQueryResult<fetchFilterSettings>>>
        >).mockResolvedValueOnce({
            data: {
                filterSettings: [{}],
                ignoredSkills: [
                    {
                        id: 1,
                        title: "PHP"
                    },
                    {
                        id: 2,
                        title: "Javascript"
                    }
                ]
            }
        });

        const projects = [
            new ProjectBuilder().setJobslist([8, 2, 3]).build(),
            new ProjectBuilder().setJobslist([4, 5]).build()
        ];
        const filteredProject = await filterProjects(projects, [isAcceptableSkills]);
        expect(filteredProject.length).toEqual(1);
    });

    it("should only include project which budget in range", async () => {
        jest.spyOn(gqlClient, "query").mockReset();

        (jest.spyOn(gqlClient, "query") as jest.SpyInstance<
            Promise<DeepPartial<ApolloQueryResult<fetchFilterSettings>>>
        >).mockResolvedValueOnce({
            data: {
                filterSettings: [
                    {
                        max_budget: 400,
                        min_budget: 30
                    }
                ],
                ignoredSkills: []
            }
        });
        const projects = [
            new ProjectBuilder()
                .setBudget(10, 29)
                .setExchangeRate(1)
                .build(),
            new ProjectBuilder()
                .setBudget(40, 300)
                .setExchangeRate(1)
                .build()
        ];
        const filteredProjects = await filterProjects(projects, [isExpectedBudget]);
        expect(filteredProjects.length).toEqual(1);
    });

    // it("should only include project which has readable langauge", async () => {
    //     const projects = [
    //         new ProjectBuilder()
    //             .setJobDesc(
    //                 "If your services or containers attempt to use more memory than the system has available, you may experience an Out Of Memory Exception (OOME) and a container, or the Docker daemon, might be killed by the kernel OOM killer. To prevent this from happening"
    //             )
    //             .build(),
    //         new ProjectBuilder()
    //             .setJobDesc(
    //                 "Dự báo thời tiết hôm nay 31.12.2019, do ảnh hưởng của không khí lạnh, ở vùng núi Bắc Bộ có mưa nhỏ; Bắc và Trung Trung bộ do kết hợp với nhiễu động gió đông trên cao nên có mưa vừa, mưa to."
    //             )
    //             .build(),
    //         new ProjectBuilder()
    //             .setJobDesc(
    //                 "如果您的服务或容器尝试使用的内存超过系统可用的内存，则可能会遇到内存不足异常（OOME），并且容器或Docker守护程序可能会被内核OOM杀手杀死。为了防止这种情况的发生"
    //             )
    //             .build()
    //     ];

    //     const filteredProjects = await filterProjects(projects, [isReadableLanguage]);
    //     expect(filteredProjects.length).toEqual(2);
    // });

    it("should only include project which has qualitied description", async () => {
        jest.spyOn(gqlClient, "query").mockReset();

        (jest.spyOn(gqlClient, "query") as jest.SpyInstance<
            Promise<DeepPartial<ApolloQueryResult<fetchFilterSettings>>>
        >).mockResolvedValueOnce({
            data: {
                filterSettings: [
                    {
                        description_length: 10
                    }
                ],
                ignoredSkills: []
            }
        });
        const projects = [
            new ProjectBuilder().setJobDesc(randomString.generate(10)).build(),
            new ProjectBuilder().setJobDesc(randomString.generate(11)).build(),
            new ProjectBuilder().setJobDesc(randomString.generate(3)).build()
        ];
        const filteredProjects = await filterProjects(projects, [isQualitiedDescription]);
        expect(filteredProjects.length).toEqual(2);
    });

    it("should only include qualitied project", async () => {
        jest.spyOn(gqlClient, "query").mockReset();

        (jest.spyOn(gqlClient, "query") as jest.SpyInstance<
            Promise<DeepPartial<ApolloQueryResult<fetchFilterSettings>>>
        >).mockResolvedValueOnce({
            data: {
                filterSettings: [{}],
                ignoredSkills: []
            }
        });
        const projects = [
            new ProjectBuilder().setNDA(true).build(),
            new ProjectBuilder().setNonPublic(true).build(),
            new ProjectBuilder().setType("contest").build(),
            new ProjectBuilder().setFreeBid(1).build(),
            new ProjectBuilder().setFullTime(true).build(),
            new ProjectBuilder()
                .setNDA(false)
                .setNonPublic(false)
                .setType("project")
                .setFreeBid(0)
                .setFullTime(false)
                .build()
        ];
        const filteredProjects = await filterProjects(projects, [isAcceptAbleProject]);
        expect(filteredProjects.length).toEqual(1);
    });

    it("should only include project which has high rate", async () => {
        jest.spyOn(gqlClient, "query").mockReset();

        (jest.spyOn(gqlClient, "query") as jest.SpyInstance<
            Promise<DeepPartial<ApolloQueryResult<fetchFilterSettings>>>
        >).mockResolvedValueOnce({
            data: {
                filterSettings: [
                    {
                        exchange_rate: 0.5
                    }
                ],
                ignoredSkills: []
            }
        });
        const projects = [
            new ProjectBuilder().setExchangeRate(0.4).build(),
            new ProjectBuilder().setExchangeRate(0.5).build(),
            new ProjectBuilder().setExchangeRate(0.6).build()
        ];
        const filteredProjects = await filterProjects(projects, [isHighRate]);
        expect(filteredProjects.length).toEqual(2);
    });
});
