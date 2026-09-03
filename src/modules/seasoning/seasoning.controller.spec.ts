import { Test, TestingModule } from "@nestjs/testing";
import { SeasoningController } from "./seasoning.controller";
import { SeasoningService } from "./seasoning.service";

describe("SeasoningController", () => {
  let controller: SeasoningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasoningController],
      providers: [SeasoningService]
    }).compile();

    controller = module.get<SeasoningController>(SeasoningController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
