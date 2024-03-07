export interface OwnershipData {
    data: InstitutionOwnership;
}
  
export interface InstitutionOwnership {
    ownershipList: OwnershipEntry[];
}
  
export interface OwnershipEntry {
    reportDate: ReportDate;
    organization: string;
    pctHeld: PercentageHeld;
    position: Position;
    value: Value;
}

export interface ReportDate {
    raw: number;
    fmt: string;
}

export interface PercentageHeld {
    raw: number;
    fmt: string;
}

export interface Position {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface Value {
    raw: number;
    fmt: string;
    longFmt: string;
}
