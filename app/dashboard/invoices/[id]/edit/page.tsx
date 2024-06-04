import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {
  fetchInvoiceById,
  fetchCustomers
} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const id = params.id
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])
  const customer = customers.filter((customer) => customer.id == invoice.customer_id)[0]
  return {
    title: `Edit ${customer.name}'s Invoice`
  }
}

export default async function Page({ params }: Props) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}