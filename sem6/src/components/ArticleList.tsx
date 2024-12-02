import React from "react";
import { Stack, Container } from "@mui/material";
import ArticleAccordion from "./ArticleAccordion";

// Интерфейс пропсов списка статей
interface ArticleListProps {
    articles: { title: string, content: string }[];
    spacing: number;
}

// Компонент списка статей
const ArticleList: React.FC<ArticleListProps> = ({ articles, spacing }) => {
    return (
        <Container sx={{marginTop: "40px"}}>
            <Stack spacing={spacing}>
                {articles.map((article, index) => (
                    <ArticleAccordion
                        key={index}
                        title={article.title}
                        content={article.content}
                        isOdd={index % 2 !== 0}
                    />
                ))}
            </Stack>
        </Container>
    );
};

export default ArticleList;
