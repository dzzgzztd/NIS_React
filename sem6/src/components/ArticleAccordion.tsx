import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import './ArticleAccordion.scss';

// Интерфейс пропсов компонента статьи
interface ArticleAccordionProps {
    title: string;
    content: string;
    isOdd: boolean;
}

// Компонент статьи
const ArticleAccordion: React.FC<ArticleAccordionProps> = ({ title, content, isOdd }) => {
    return (
        <Accordion className={`article-accordion ${isOdd ? 'odd' : 'even'}`}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className="article-title">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{content}</Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default ArticleAccordion;
