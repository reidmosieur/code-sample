import React, { ReactNode, useMemo } from "react";
import TableOfContents from "./TableOfContents";
import PortfolioItemCard from "./PortfolioItemCard";
import styles from "./Portfolio.module.css";

// Interface for a single portfolio piece 
interface PortfolioPiece {  
    // Title of the portfolio piece
        title: string;  
    // Description of the portfolio piece
        description: string;
    // Paragraph with more info on the portfolio piece
        paragraph: ReactNode;  
    // Proficiency or skill level 
        proficiency: string;  
    // Completion percentage
        percent: string;  
    // Array of links related to the portfolio piece
        items: { title: string | null; url: string | undefined }[];  
}
    
    // Interface for a single table of contents item
interface TableOfContentsItem {
    id: number;  // Unique ID for the item
    name: string; // Name of the item
    url: string;  // Link for the item
}
      
// Props for the Portfolio component 
interface PortfolioProps {
// Array of PortfolioPiece interfaces 
    portfolioPieces: Array<PortfolioPiece>;
// Array of TableOfContentsItem interfaces
    portfolioPiecesTableOfContents: Array<TableOfContentsItem>;
}

// Memoized version of the PortfolioItemCard component
const MemoizedPortfolioItemCard = React.memo(PortfolioItemCard);

// Portfolio component 
export default function Portfolio({ portfolioPieces, portfolioPiecesTableOfContents }: PortfolioProps) {
    // Memoized version of the table of contents
    const memoizedPortfolioPiecesTableOfContents = useMemo(() => portfolioPiecesTableOfContents, [portfolioPiecesTableOfContents]);

    return (
        <div className={styles.portfolioContainer} >
            <TableOfContents 
                portfolioPiecesTableOfContents={memoizedPortfolioPiecesTableOfContents}
            />
            {/* Use React.memo() to memoize PortfolioItemCard */}
            {portfolioPieces.map((portfolioPiece, index) => (
                <MemoizedPortfolioItemCard
                    key={index}
                    title={portfolioPiece.title}
                    description={portfolioPiece.description}
                    paragraph={portfolioPiece.paragraph}
                    proficiency={portfolioPiece.proficiency}
                    percent={portfolioPiece.percent}
                    items={portfolioPiece.items}
                />
            ))}
        </div>
    );
}
