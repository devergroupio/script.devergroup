import { ProjectBuilder } from "~@/__fixtures__/utils.fixture";
import saveProjects from "~@/core/modules/freelancer/functions/fl_save_job";

(saveProjects as jest.Mock) = jest.fn();
// tslint:disable-next-line:ordered-imports
import bidProject from "~@/core/modules/freelancer/functions/fl_bid_job";
import fetchToken from "~@/core/modules/freelancer/functions/vendor/fl_get_token";
import gqlClient from "~@/core/modules/hasura.module";
import httpModule from "~@/core/modules/http.module";
import { serializeProject } from "~@/core/utils";
describe("Bid Project functionary", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    (saveProjects as jest.Mock).mockReset();
    (jest.spyOn(gqlClient, "query") as jest.SpyInstance)

      .mockResolvedValueOnce({
        data: {
          bot_settings_bidsettings: [
            {
              bid_rate: 5,
              min_cost: 40,
              timer: 3,
              id: 1,
              template: `
Hello sir,
    #AI_TASKS
    I have ability to do this project: #AI_SKILLS
    I always:
        - Do  project fast as possible.
        - Charge a reasonable cost.
        - Provide Quality Product. All my previous project was feedback 5 stars. because i care the customer feeling. so please give me a chance to work with you.`
            }
          ]
        }
      })
      .mockResolvedValueOnce({
        data: {
          detectPhases: [
            {
              id: 1,
              phase: "hello"
            },
            {
              id: 2,
              phase: "blue"
            }
          ]
        }
      });

    (jest.spyOn(gqlClient, "mutate") as jest.SpyInstance).mockResolvedValue({});
    (fetchToken as jest.Mock) = jest.fn().mockResolvedValue("crsf token");
  });
  it("should use the  default template", async () => {
    jest
      .spyOn(httpModule.axios, "post")
      .mockResolvedValue({ data: { status: "success" } });
    let expectObj: any = {};
    (saveProjects as jest.Mock).mockImplementation(data => {
      const proj = data[0];
      expectObj.isBid = proj.isBid;
      expectObj.our_cost = proj.our_cost;
      expectObj.our_cover_letter = proj.our_cover_letter;
    });
    const project = new ProjectBuilder()
      .setJobDesc("hello")
      .setBudget(10, 100)
      .setExchangeRate(1)
      .setId(1)
      .setLink("/google.html")
      .build();
    const serializedProject = serializeProject(project);
    await bidProject(serializedProject);

    expect(saveProjects).toHaveBeenCalledTimes(1);
    expect(expectObj.isBid).toBeTruthy();
    expect(expectObj.our_cover_letter).toBeDefined();
  });

  it("should use the pre-setting template", async () => {
    jest
      .spyOn(httpModule.axios, "post")
      .mockResolvedValue({ data: { status: "success" } });
    let expectObj: any = {};
    (saveProjects as jest.Mock).mockImplementation(data => {
      const proj = data[0];
      expectObj.isBid = proj.isBid;
      expectObj.our_cost = proj.our_cost;
      expectObj.our_cover_letter = proj.our_cover_letter;
    });

    const project = new ProjectBuilder()
      .setJobDesc("hello")
      .setBudget(10, 100)
      .setExchangeRate(1)
      .setId(1)
      .setLink("/google.html")
      .build();
    const serializedProject = serializeProject(project, {
      our_cover_letter: "test cover letter"
    });
    await bidProject(serializedProject);

    expect(saveProjects).toHaveBeenCalledTimes(1);
    expect(expectObj.isBid).toBeTruthy();
    expect(expectObj.our_cover_letter).toBeDefined();
    expect(expectObj.our_cover_letter).toEqual("test cover letter");
  });

  it("should tracking the message", async () => {
    jest.spyOn(httpModule.axios, "post").mockResolvedValue({
      data: {
        status: "success"
      }
    });
    let expectObj: any = {};
    (saveProjects as jest.Mock).mockImplementation(data => {
      const proj = data[0];
      expectObj.isBid = proj.isBid;
      expectObj.our_cost = proj.our_cost;
      expectObj.our_cover_letter = proj.our_cover_letter;
    });

    const project = new ProjectBuilder()
      .setJobDesc("hello")
      .setBudget(10, 100)
      .setExchangeRate(1)
      .setId(1)
      .setLink("/google.html")
      .build();
    const serializedProject = serializeProject(project);
    await bidProject(serializedProject);

    expect(saveProjects).toHaveBeenCalledTimes(1);
    expect(expectObj.isBid).toBeTruthy();
    expect(expectObj.our_cover_letter).toBeDefined();
  });
});
