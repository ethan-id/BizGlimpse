export interface ShareActivityData {
    maxAge: number;
    period: string;
    buyInfoCount: {
      raw: number;
      fmt: string;
      longFmt: string;
    };
    buyInfoShares: {
      raw: number;
      fmt: string;
      longFmt: string;
    };
    buyPercentInsiderShares: {
      raw: number;
      fmt: string;
    };
    sellInfoCount: {
      raw: number;
      fmt: string;
      longFmt: string;
    };
    sellInfoShares: {
      raw: number;
      fmt: string;
      longFmt: string;
    };
    sellPercentInsiderShares: {
      raw: number;
      fmt: string;
    };
    netInfoCount: {
      raw: number;
      fmt: string;
      longFmt: string;
    };
    netInfoShares: {
      raw: number;
      fmt: string;
      longFmt: string;
    };
    netPercentInsiderShares: {
      raw: number;
      fmt: string;
    };
    totalInsiderShares: {
      raw: number;
      fmt: string;
      longFmt: string;
    };
}