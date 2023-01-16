from django.shortcuts import render
from .models import product, seller, buyer
# Create your views here.
def index(request):
    prod = product.objects.all()
    return render(request, 'home.html', {'products':prod})

def buy(request, pk):
    print(pk)
    prod = product.objects.get(pk=pk)

    if request.method == 'POST':
        bname = request.POST['bname']
        baddress = request.POST['baddress']
        bphone = request.POST['bphone']
        quantity = int(request.POST['quantity'])

        by = buyer(bname=bname, baddress=baddress,bphone=bphone)
        by.save()
        amount = float(prod.price)
        pnname = prod.name
        pinfor = prod.infor
        price = amount
        prod_quantity = quantity
        prod_total = amount*quantity
        slr = seller.objects.all()
        data = {'pname':pnname,'pprice':price,'bname':bname,'baddress':baddress,'bphone':bphone,'pinfor':pinfor,'quantity':prod_quantity,'total':prod_total}
        return render(request, 'bill.html', {'data':data, 'slr':slr})
    return render(request, 'buy.html')

# def bill(request):
#     slr = seller.objects.all()
#     return render(request, 'bill.html', {'slr': slr})