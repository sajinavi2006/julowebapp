import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

export interface LoanInfoProps {
    header: {
        step: number;
        title: string;
        subtitle?: string;
    };
    content: {
        icon: EmotionJSX.Element | string;
        title: EmotionJSX.Element | string;
        description: EmotionJSX.Element | string;
    }
}