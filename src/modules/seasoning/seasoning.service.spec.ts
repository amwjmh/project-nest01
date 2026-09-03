import { Test, TestingModule } from "@nestjs/testing";
import { SeasoningService } from "./seasoning.service";

describe("SeasoningService", () => {
  let service: SeasoningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasoningService]
    }).compile();

    service = module.get<SeasoningService>(SeasoningService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
