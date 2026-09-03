import { PartialType } from "@nestjs/swagger";
import { CreateSeasoningDto } from "./create-seasoning.dto";

export class UpdateSeasoningDto extends PartialType(CreateSeasoningDto) {}
