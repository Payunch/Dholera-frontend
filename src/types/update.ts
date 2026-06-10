export interface Update {
 id: number;
 title: string;
 content: string;
 category:"Infrastructure" |"Industrial" |"Planning" |"Investment" |"General";
 imageUrl?: string;
 imagePosition?:"top" |"bottom";
 published: boolean;
 publishedAt: string;
 createdAt: string;
 updatedAt: string;
}

export type UpdateCategory = Update["category"] |"All";
