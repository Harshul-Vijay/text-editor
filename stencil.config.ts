import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import path from 'path';

// https://stenciljs.com/docs/config

export const config: Config = {
  autoprefixCss: true,
  buildDist: true,
  /* buildEs5: true, */
  devServer: {
    https: {
      cert: `-----BEGIN CERTIFICATE-----
MIIEFDCCAvygAwIBAgIJAO2BSpJqwJ3NMA0GCSqGSIb3DQEBCwUAMIGjMQswCQYD
VQQGEwJJTjESMBAGA1UECAwJUmFqYXN0aGFuMQ0wCwYDVQQHDARLb3RhMR4wHAYD
VQQKDBVsb2NhbERldmVsb3BtZW50IEluYy4xETAPBgNVBAsMCGxvY2FsRGV2MRIw
EAYDVQQDDAlsb2NhbGhvc3QxKjAoBgkqhkiG9w0BCQEWG2xvY2FsZGV2c0Bsb2Nh
bC1kZXYud2ViLmFwcDAeFw0xOTExMTQxMDE2NDhaFw0yNTA2MjMxMDE2NDhaMIGb
MQswCQYDVQQGEwJJTjESMBAGA1UECAwJUmFqYXN0aGFuMQ0wCwYDVQQHDARLb3Rh
MRkwFwYDVQQKDBBEZXZlbG9wZXJzLCBJbmMuMRAwDgYDVQQLDAd3ZWJEZXZzMSgw
JgYJKoZIhvcNAQkBFhl3ZWIuZGV2c0B3ZWItZGV2cy53ZWIuYXBwMRIwEAYDVQQD
DAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCksyuA
Ir2nof+CqHcC9foiAvraliT0heLUg13abJlE5WE/3xg9TsqrEk+h9RXltMG3Ud6D
B/5WDu5bdT5fQL7cZulwei0/FXKwWAcVlQOpDCR0u8VKyB5Q0ZdXyq+i4TRNwAvT
hwvRTcP+gK2uCJiUE8/tCFqL/NaQnP0KoXOClp5u638J2oSup+8Po3kfbu4uvjSZ
+Y2uneYyPIseZ0rUVnJ59dF3a188Hl13s/sftEqHJEYh8EfHFHKGWnkW/9xRlQvH
XsV9pG5RNIMzrhK1pAkp3HlFIliXfGzG4aEUlvtFgrXFJftKaQc2b4GQ4gujImlJ
V7z/Zq0ulnHJNi5DAgMBAAGjUTBPMB8GA1UdIwQYMBaAFLvBfI81a8uCEqJeKpm2
rJnYLCLQMAkGA1UdEwQCMAAwCwYDVR0PBAQDAgTwMBQGA1UdEQQNMAuCCWxvY2Fs
aG9zdDANBgkqhkiG9w0BAQsFAAOCAQEAUDbT+bsQJW78llZ7y5At64ZM33eJAXYt
ftaHmK6vZbxY6aidnV7ZAn4UVo1PsZCO3wITc6a5AWcxRi46vR9zhuhahLq2VO/q
/BCF2egCsypR79c6BED6CpuFSJFSKejej5RGLM8kjKrzmoiG7yanOz9lZ1DgMob1
L4i1SQElKLMUWLvJ0vqYYxXFiCVhs0MDdjMdSeG/biUbzIsfE8oPOO0x8gp7C3MP
JGVLas0il7BsmHC5BZUgj0qdvxGsE2lk9VpabWz+dp/Q7k6eONI6GHcV+wJRlnUl
8ioZeQceuZzXWdfY7nzXKxL5cT8GPncJ95XL3Ujrs85aqFXR8Oa8Ow==
-----END CERTIFICATE-----`,
          key: `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCksyuAIr2nof+C
qHcC9foiAvraliT0heLUg13abJlE5WE/3xg9TsqrEk+h9RXltMG3Ud6DB/5WDu5b
dT5fQL7cZulwei0/FXKwWAcVlQOpDCR0u8VKyB5Q0ZdXyq+i4TRNwAvThwvRTcP+
gK2uCJiUE8/tCFqL/NaQnP0KoXOClp5u638J2oSup+8Po3kfbu4uvjSZ+Y2uneYy
PIseZ0rUVnJ59dF3a188Hl13s/sftEqHJEYh8EfHFHKGWnkW/9xRlQvHXsV9pG5R
NIMzrhK1pAkp3HlFIliXfGzG4aEUlvtFgrXFJftKaQc2b4GQ4gujImlJV7z/Zq0u
lnHJNi5DAgMBAAECggEBAJkJYwJNRazd+m2N3AgER8gSvMUffnc3cO3Gow6ymjhK
a3LN+df9vpP3D8eN1Cr9KoMMr5VReCK+/Pw+lRYtMyvY9FBvNlvHsinpoauMKzqI
7dcKIui5ynGOTvJkg471c4RLTrHeajyx5cw2BSwRELWHM00s1fX9meIF/ZpDKvHL
RRFwk2O48DzozmWTseCAReJXV6Keau3O2zhc1PJoAIzAy7nTnTe1n2tB9M/MyhEy
NXO/32SifE9cHpQDPALRIM7f5/ZcPIQGREwl95Tbsym5xdrLJcswY0M4MI30K1le
aCb6fjBklpLpIy20XW9FlgvpHzMvChRIVcCKi5qg8QECgYEAzomjZliX0jDf65VY
SsrfPfZ7NBzvWiiXG7IufZeiJxSLEsixer4etD5sMF7+/QatnQdBtiEDKC2LLOSD
nwC07GMgqcDGaZDynbADcU8lIQ9cdtyQp70W0fIC7g+d4jDUIrzQmfyxInRcOnTc
PWZoB7NYRjhOFO7OLPddLUIBNtcCgYEAzCSNOMIopm1DmBEWNtrf+PyLZsCc6RSD
l3wv5aSltzw5T9dXE0eMEPTyNaGladw8mBXKRIQ21r88IYMGimxVR8ah5ARs1A3G
oZpsHEXZfYg560VJqeMoyqIhbtDwXmD2XL+0ghxA5CwDJ94hRvnEHbEazhAJQ7IV
Bz2t+9z7EnUCgYAPTbOFydq2AFkXI6G/KPkRpknKurohfBB2ROWc+LdTHfqQEb7U
0XGE+Xsaum86YFxM3lTIIfoR6A3/7Y6zIWJGgbHR4i7Rc6QGexxGMQ8XPAQl6oHt
a91dAQmmihGwyN1vFX5/anHVk7mhuzb2dbgPmgJYcaOXeXpdapbE27crUQKBgQCQ
k3porik35L4wXjmLU+u3XLQla1g1QlAH4u3RB5BNextjzjBe+Rbbk35OOVL66/0G
ALilWbW01O7zFOZ29k5XbPeOkwu4CqGYJdNXGqjzXJ0YYJPQ+44SJEzlPJhfXvBb
s3FVjEjwz7LUc17B83XPSXSgZ38IMIDwBeDINTKjWQKBgQCDJSArx25Ie8Tqwhvn
K4F2q5K/10cziJhFKmEOlMa/WazOX52mOUXV+z0LoNvgYweR5xD6R5kQsMNrNHd2
b6/fu/Xx66ZhuaHGAqUj3L2g5jed/zNtIdLCFwIXGQkCT376f+ztXQ9cWIMrRXmZ
Myqo0Wt+X6EZw5RZ1n996c23Cg==
-----END PRIVATE KEY-----`
    },
  },
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  minifyCss: true,
  minifyJs: true,
  namespace: 'TextEditor',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        globPatterns: [
          "**/*.(js,html,css,svg)"
        ]
      },
      baseUrl: 'https://localhost:3334'
    },
    {
      type: 'dist',
    }
  ],
  plugins: [
    sass({
      includePaths: [
        path.resolve('./node_modules'),
        path.resolve('src/global')
      ]
    })
  ]
};
