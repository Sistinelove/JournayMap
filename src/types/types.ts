import {ModalProps} from '@gravity-ui/uikit';
import {ReactNode} from 'react';

export interface Attraction {
    id: number;
    name: string;
    description: string;
    rating: number;
    photo: string;
    location: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    status: 'В планах' | 'Осмотрена';
    dateAdded: string;
}

export interface BaseModalProps extends ModalProps {
    onOpenChange: (open: boolean) => void;
}

export interface EditModalProps extends BaseModalProps {
    item: Attraction;
    onConfirm: (data: UpdateAttraction) => Promise<void>;
}

export interface CreateModalProps extends BaseModalProps {
    onConfirm: (data: CreateAttraction) => Promise<void>;
}

export type UpdateAttraction = Pick<Attraction, 'id' | 'name' | 'description' | 'rating' | 'photo'>;

export type CreateAttraction = Omit<Attraction, 'id' | 'dateAdded'>;

export type AppProps = {
    title?: string;
    children?: ReactNode;
};

export interface ActionsDropdownProps {
    item: Attraction;
    onDelete: (id: number) => void;
    onEditSuccess: () => void;
    onCreateSuccess: () => void;
}

export interface TableColumnProps {
    handleDeleteAttachment: (id: number) => void;
    handleEditSuccess: () => void;
}
