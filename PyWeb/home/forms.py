from django import forms
import re
from django.contrib.auth.models import User

class RegistationForm(forms.Form):
    username = forms.CharField(label='Nhap tai khoan',max_length=30)
    email = forms.EmailField(label='Nhap email')
    password1 = forms.CharField(label='nhap mat khau', widget=forms.PasswordInput())
    password2 = forms.CharField(label='Nhap lai mat khau', widget=forms.PasswordInput())

    def clean_password2(self):
        if 'password1' in self.cleaned_data:
            password1 = self.cleaned_data['password1']
            password2 = self.cleaned_data['password2']
            if password1 == password2 and password1:
                return password2
            raise forms.ValidationError('Mat khau khong khop!')
        raise forms.ValidationError('Chua nhap mat khau')

    def clean_username(self):
        username = self.cleaned_data['username']
        if not re.search(r'^\w+$', username):
            raise forms.ValidationError('Ten tai khoan chua ki tu dac biet')
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError('Ten tai khoan da ton tai')

    def save(self):
        User.objects.create_user(username=self.cleaned_data['username'], email=self.cleaned_data['email'], password=self.cleaned_data['password1'])
