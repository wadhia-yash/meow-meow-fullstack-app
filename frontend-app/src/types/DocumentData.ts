export type DocumentData = {
    type: 'bank-draft' | 'bill-of-lading' | 'invoice' | 'bank-draft-2' | 'bill-of-lading-2',
    title: string,
    position: number,
    draggable: string,
}