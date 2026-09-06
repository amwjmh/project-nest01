import { PartialType } from "@nestjs/swagger";
import { CreateSupplementaryDto } from "./create-supplementary.dto";

export class UpdateSupplementaryDto extends PartialType(CreateSupplementaryDto) {}
